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