const Joi = require("joi");
const {
  USER_EMAIL_VALIDATION,
  USER_PASSWORD_VALIDATION,
} = require("../helper/CONST");

module.exports.UserShema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "fr"] },
    })
    .required()
    .messages(USER_EMAIL_VALIDATION),
  password: Joi.string().min(8).required().messages(USER_PASSWORD_VALIDATION),
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
