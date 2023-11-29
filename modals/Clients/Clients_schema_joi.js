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
