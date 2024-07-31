
import catchAsync from '../utils/catchAsync.js';

const validateRequest = (schema) => {
  return catchAsync(async (req, res, next) => {
    console.log("6 ", typeof req.body.admin)
    console.log("6 ", req.body.admin)
    await schema.parseAsync({
      body: req.body,
      cookies: req.cookies,
    });

    next();
  });
};

export default validateRequest;
