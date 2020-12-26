const { ERROR_MESSAGE } = require("./CONST");

module.exports.handleErrors = ({ details }) => {
  const [properties] = details;
  const { message, type, path } = properties;
  const Errors = {};

  details ? ((Errors.message = ERROR_MESSAGE), (Errors[path] = message)) : null;

  return Errors;
};
