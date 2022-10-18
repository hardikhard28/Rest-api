const Joi = require("joi");
const productScheme = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  size: Joi.string().required(),
});

module.exports = { productScheme };
