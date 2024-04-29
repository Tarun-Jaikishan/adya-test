const Joi = require("joi");

const registerSchema = Joi.object({
  username: Joi.string().alphanum().required(),
  name: Joi.string().max(50).required(),
  phone_number: Joi.string().min(10).max(10).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(20).required(),
  role: Joi.string().default("customer"),
});

const loginSchema = Joi.object({
  username: Joi.string().alphanum().required(),
  password: Joi.string().min(6).max(20).required(),
});

module.exports = { registerSchema, loginSchema };
