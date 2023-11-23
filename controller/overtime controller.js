const overTimeSchema = require('../modals/overtime schema');
// const { format,parse }=require('date-fns')
const Joi = require('@hapi/joi');
const allemployee = require("./../modals/all-empolyeeSchema/allEmpolyeeSchema");


// Controller function for GET /leave
const getOverUsers = async (req, res) => {
  const perPage = 10;
  const page = parseInt(req.query.page) || 1; // Parse the page query parameter or default to 1

  try {
      const totalUsers = await overTimeSchema.countDocuments();
      const totalPages = Math.ceil(totalUsers / perPage);

      const data = await overTimeSchema
          .find()
          .sort({ _id: -1 })
          .skip((page - 1) * perPage)
          .limit(perPage);

      if (data && data.length > 0) {
          res.status(200).send({
              data,
              totalPages:totalPages,
              currentPage: page,
          });
      } else {
          res.status(400).send("No Users");
      }
  } catch (err) {
      res.status(500).send('Error: ' + err);
  }
};

// Controller function for POST /leave/registration

const registerOverUser = async (req, res) => {   

    try {
      const schema = Joi.object({ Employee_Name:Joi.string().required(),Discription:Joi.string().required(),Overtime_Date: Joi.string().required(),Overtime_Hour:Joi.string().required()});
      const { error } = schema.validate(req.body);
      if (error) return res.status(400).send(error.details[0].message);
      
      const { Employee_Name, Discription, Overtime_Date, Overtime_Hour } = req.body;

      // const formattedDate = new Date(Overtime_Date).toLocaleDateString('en-GB');
      // const id=req.user.id
      // const user = await allemployee .findOne({email:id}); 
      const newLeaveUser = new overTimeSchema({ 
        // userId:user._id,
        Employee_Name, Discription, Overtime_Date, Overtime_Hour });
      await newLeaveUser.save();

      res.status(200).send('Overtime Added Sucessfully');
    } catch (err) {
        res.status(400).send('error: ' + err);
    }
};

const searchOverUser = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = 10;
  const key = req.params.key;

  const query = {
    $or: [
          { Employee_Name: { $regex: key, $options: "i" } },
          { Overtime_Date: { $regex: key, $options: "i" } },
        
         
      // Add other fields here
    ]
  };

  try {
    const users = await overTimeSchema
      .find(query).sort({Name:1})
      .skip((page - 1) * perPage)
      .limit(perPage);

      if (users && users.length > 0) {
        res.status(200).send(users);
      } else {
        res.status(400).send("No Users");
      }
    } catch (err) {
    res.status(500).send( err);
  }
};

  const getId = async (req, res) => {
    const {id}=req.params
    try {
        const users = await overTimeSchema.findById(id)
            if (users) {
              res.status(200).send(users);
            } else {
              res.status(400).send("No Users"); 
            }  
          } catch (err) {
        res.status(400).send('error: ' + err);
    }
};

const updateOverUser = async (req, res) => {
    try {
      const users = await overTimeSchema.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!users) {
        return res.status(404).send( "User not found" );
      }
  
      return res.status(200).send("Overtime is Updated successfully")
    } catch (error) {
      res.status(500).send(error);
    }
  };
  
  const deleteOverUser = async (req, res) => {
    try {
      const users=await overTimeSchema.findByIdAndDelete(req.params.id);
      if (!users) {
        return res.status(404).send("User not found" );
      }
  
      return res.status(200).send("Overtime is Deleted successfully" )
    } catch (error) {
      res.status(500).send( error );
    }
  };

  module.exports = {
    getOverUsers,
    registerOverUser,
    searchOverUser,
    updateOverUser,
    deleteOverUser,
    getId
  };

// Define other controller functions for your routes
