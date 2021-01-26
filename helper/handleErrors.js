const { ERROR_MESSAGE } = require("./CONST");
/**
 *Take data from Joi
 *
 * @param {Array<Object>} details  Destructurated from datas
 */
module.exports.handleErrors = ({ details }) => {
  console.log("Errors Details", details);
  const Errors = {};
  details
    ? details.map((err) => {
        return (
          (Errors.Error = ERROR_MESSAGE),
          (Errors[err.path] = { expected: err.message })
        );
      })
    : null;

  return Errors;
};
