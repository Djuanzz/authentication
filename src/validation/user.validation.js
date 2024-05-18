import Joi from "joi";

const signupValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().required(),
  role: Joi.string().optional(),
});

const signinValidation = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().optional(),
});

const updateValidation = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(6).optional(),
  role: Joi.string().optional(),
});

const currentValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
});

export default {
  signupValidation,
  signinValidation,
  updateValidation,
};
