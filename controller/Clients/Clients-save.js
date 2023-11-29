const Clients = require("../../modals/Clients/Clients_schema");
const Joi = require('@hapi/joi');

exports.ClientsAdd = async (req, res) => {
  try {
    const schema = Joi.object({
      Name: Joi.string().required(),
      date: Joi.date().iso().required(),
      Address: Joi.string().required(),
      email: Joi.string().email().required(),  // Include email validation
      Project: Joi.string().required(),
      Mobile_Number: Joi.number().required(),
      Company_Name: Joi.string().required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
      // Send a more informative response
      return res.status(400).send({ error: error.details[0].message });
    }

    const {
      Name,
      date,
      Address,
      email,
      Project,
      Mobile_Number,
      Company_Name,
    } = req.body;
    
    const newClient = new Clients({
      Name,
      date,
      Address,
      email,
      Project,
      Mobile_Number,
      Company_Name
    });

    await newClient.save();
    res.status(200).send('Client added successfully!');
  } catch (err) {
    // Send a more informative response
    res.status(500).send('Error adding client: ' + err.message);
  }
};



// const Clients = require("../../modals/Clients/Clients_schema");
// const Clients_joi = require("../../modals/Clients/Clients_schema_joi");

// exports.ClientsAdd=(async (req, res) => {
//     try {
//         const { 
//                    Name,
//                    date,
//                    Address,
//                    Email,
//                    Project,
//                    Mobile_Number,
//                    Company_Name
//             } = req.body;
//             const formattedDate = new Date(date).toLocaleDateString('en-GB');

//             const user = await Clients.findOne({ Email });     
//             if(!user){            
                
//                 const Clients_employees = new Clients({
//                    Name,
//                    date:formattedDate,
//                    Address,
//                    Email,
//                    Project,
//                    Mobile_Number,
//                    Company_Name
//                 });
//                 const { error } = Clients_schema_joi.validate(req.body);

//                 if (error) {
//                 return res.status(400).send(error.details[0].message);
//                 }

//                 await Clients_employees.save();

//                 res.status(200).send( "Client Data Added Successfully" );
//             }else{
//                 res.status(200).send( "User Email Already Registered" );

//             }

//     } catch (err) {
//         console.error("Error:", err);
//         res.status(500).send("Internal server error");
//     }
// });


