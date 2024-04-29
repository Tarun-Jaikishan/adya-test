const Joi = require("joi");

const restaurantSchema = Joi.object({
  name: Joi.string().alphanum().required(),
  cuisine_type: Joi.string().max(50).required(),
  location: Joi.object({
    city: Joi.string().required(),
    state: Joi.string().required(),
  }).required(),
});

module.exports = { restaurantSchema };
