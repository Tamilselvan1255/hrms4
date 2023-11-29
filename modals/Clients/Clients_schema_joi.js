<<<<<<< HEAD
const Joi = require('@hapi/joi');

const ClientsJoiSchema = Joi.object({
  Name: Joi.string().required(),
  date: Joi.date().iso().required(),
  Address: Joi.string().required(),
  email: Joi.string().email().required(),
  Project: Joi.string().required(),
  Mobile_Number: Joi.number().required(),
  Company_Name: Joi.string().required(),
});

module.exports = ClientsJoiSchema;
=======
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
>>>>>>> 6865a817290281c9bdfd0135ef93d72d6a6263fe
