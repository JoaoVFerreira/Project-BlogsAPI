const schemaUserBody = require('../schemas/userBodySchema');

const userBodyValidations = (req, _res, next) => {
  const { error } = schemaUserBody.validate(req.body);

  if (error) {
    const [status, message] = error.message.split('|');
    const handleError = { status: Number(status), message };
    return next(handleError);
  }
  return next();
};

module.exports = {
  userBodyValidations,
};