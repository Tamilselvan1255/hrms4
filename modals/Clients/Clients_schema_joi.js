const Joi = require("@hapi/joi");

const Clients_joi = Joi.object({
  Name: Joi.string().required(),
  Email: Joi.string().email().required(),
  Address: Joi.string().required(),
  Mobile_Number: Joi.number().required(),
  date: Joi.date().required(),
  Company_Name: Joi.string().required(),
  Project:Joi.string().required()
  
});

module.exports = Clients_joi;
