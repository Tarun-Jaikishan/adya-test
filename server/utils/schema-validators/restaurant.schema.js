const Joi = require("joi");

const restaurantSchema = Joi.object({
  name: Joi.string().required(),
  cuisine_type: Joi.string().required(),
  location: Joi.object({
    city: Joi.string().required(),
    state: Joi.string().required(),
  }).required(),
  timing: Joi.object({
    from: Joi.string().required(),
    to: Joi.string().required(),
  }).required(),
});

module.exports = { restaurantSchema };
