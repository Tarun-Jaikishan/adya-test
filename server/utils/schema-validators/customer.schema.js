const Joi = require("joi");

const slotSchema = Joi.object({
  id: Joi.string().required(),
  dateOfBooking: Joi.string().required(),
  tableId: Joi.string().required(),
});

const ratingSchema = Joi.object({
  id: Joi.string().required(),
  rating: Joi.number().required().min(1).max(5),
});

const reservationSchema = Joi.object({
  restaurantId: Joi.string().required(),
  slots: Joi.array().required().min(1),
  tableId: Joi.string().required(),
  dateOfBooking: Joi.string().required(),
});

module.exports = { slotSchema, ratingSchema, reservationSchema };
