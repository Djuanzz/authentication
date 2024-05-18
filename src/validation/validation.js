import { ResponseError } from "../error/error-handling.js";

const validate = (schema, req) => {
  const result = schema.validate(req, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (result.error) {
    throw new ResponseError(400, result.error.message);
  } else return result.value;
};

export { validate };
