const { ERROR_MESSAGE } = require("./CONST");

module.exports.handleErrors = ({ details }) => {
  console.log(details);
  const Errors = {};
  details
    ? details.map((err) => {
        return (
          (Errors.Errors = ERROR_MESSAGE),
          (Errors[err.path] = { expected: err.message })
        );
      })
    : null;

  return Errors;
};
