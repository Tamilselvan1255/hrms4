const trainingUsers = require('../modals/training schema');
const Joi = require('@hapi/joi');

// Controller function for GET /training
const getTrainingUsers =async (req, res) => {
  const perPage = 10;
  const page = parseInt(req.query.page) || 1; // Parse the page query parameter or default to 1

  try {
      const totalUsers = await trainingUsers.countDocuments();
      const totalPages = Math.ceil(totalUsers / perPage);

      const data = await trainingUsers
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

// Controller function for POST /training/registration
const registerTrainingUser = async (req, res) => {
  try {
      const schema = Joi.object({
          Training_Type: Joi.string().required(),
          Training_Cost: Joi.string().required(),
          Trainer: Joi.string().required(),
          Employee: Joi.string().required(),
          Start_Date: Joi.date().iso().required(),
          End_Date: Joi.date().iso().greater(Joi.ref('Start_Date')).required(),
          Discription: Joi.string().required(),
          Status: Joi.string().required()
      });

      const trainingData = {
          Training_Type: req.body.Training_Type,
          Employee: req.body.Employee,
          Trainer: req.body.Trainer,
          Start_Date: req.body.Start_Date,
          End_Date: req.body.End_Date,
          Discription: req.body.Discription,
          Training_Cost: req.body.Training_Cost,
          Status: req.body.Status
      };

      // No need to convert Start_Date and End_Date, as they are already in the correct format

      const { error } = schema.validate(trainingData);
      if (error) return res.status(400).send(error);


      const newTrainingUser = new trainingUsers({
          Training_Type: trainingData.Training_Type,
          Training_Cost: trainingData.Training_Cost,
          Employee: trainingData.Employee,
          Trainer: trainingData.Trainer,
          Start_Date: trainingData.Start_Date,
          End_Date: trainingData.End_Date,
          Discription: trainingData.Discription,
          Status: trainingData.Status
      });

      await newTrainingUser.save();
      res.status(200).send('Training Added Successfully');
  } catch (err) {
      res.status(400).send('error: ' + err);
  }
};


const searchTrainingUser = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = 10;
  const key = req.params.key;

  const query = {
    $or: [
      { Employee: { $regex: key, $options: "i" } },
      { Trainer: { $regex: key, $options: "i" } },
      { Training_Type: { $regex: key, $options: "i" } },
    

      // Add other fields here
    ]
  };

  try {
    const users = await trainingUsers
      .find(query)
      .sort({Name: 1 })
      .skip((page - 1) * perPage)
      .limit(perPage);

      if (users && users.length > 0) {
        res.status(200).send(users);
      } else {
        res.status(400).send("No Users");
      }
  } catch (err) {
    res.status(500).send(err );
  }
};
  

  const getId = async (req, res) => {
    const {id}=req.params
    try {
        const users = await trainingUsers.findById(id)
            if (users) {
              res.status(200).send(users);
            } else {
              res.status(400).send("No Users"); 
            }  
          } catch (err) {
        res.status(400).send('error: ' + err);
    }
};

const updateTrainingUser = async (req, res) => {
    try {
      const users = await trainingUsers.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!users) {
        return res.status(404).send("User not found" );
      }
  
      return res.status(200).send("Training is Updated successfully")
    } catch (error) {
      res.status(500).send(error);
    }
  };
  
  const deleteTrainingUser = async (req, res) => {
    try {
      const users=await trainingUsers.findByIdAndDelete(req.params.id);
      if (!users) {
        return res.status(404).send("User not found" );
      }
  
      return res.status(200).send( "Training is deleted successfully" )
    } catch (error) {
      res.status(500).send(error);
    }
  };

  module.exports = {
    getTrainingUsers,
    registerTrainingUser,
    searchTrainingUser,
    updateTrainingUser,
    deleteTrainingUser,
    getId
  };


// Define other controller functions for your routes
 