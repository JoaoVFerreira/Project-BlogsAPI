const schemaLoginValidation = require('../schemas/loginAuthSchema');

const loginAuthValidation = (req, _res, next) => {
  const { error } = schemaLoginValidation.validate(req.body);

  if (error) {
    const [status, message] = error.message.split('|');
    const handleError = { status: Number(status), message };
    return next(handleError);
  }
  return next();
};

module.exports = {
  loginAuthValidation,
};