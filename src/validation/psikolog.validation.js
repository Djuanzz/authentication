import Joi from "joi";

const createValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  keahlian: Joi.string().optional(),
});

const updateValidation = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  keahlian: Joi.string().optional(),
});

export default {
  createValidation,
  updateValidation,
};
