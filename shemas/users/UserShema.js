const Joi = require("joi");
const { ERROR_MESSAGE } = require("../../helper/ERRORS");

module.exports.UserShema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "fr"] },
    })
    .messages(ERROR_MESSAGE.USER.CREATE),
  password: Joi.string().min(8).messages(ERROR_MESSAGE.USER.CREATE),
  //repeat_password: Joi.ref("password"),
});
module.exports.userOption = {
  abortEarly: false,
  warning: true,
};

/*
TODO
 validation shema for name, age, height, weight, goal
 */
