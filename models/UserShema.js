const Joi = require("joi");
const {
  USER_EMAIL_VALIDATION,
  USER_PASSWORD_VALIDATION,
} = require("../functions/CONST");

const UserShema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "fr"] },
    })
    .required()
    .messages(USER_EMAIL_VALIDATION),
  password: Joi.string().min(8).required().messages(USER_PASSWORD_VALIDATION),
  repeat_password: Joi.ref("password"),
});
const userOption = {
  abortEarly: false,
  warning: true,
};

/*
 name, age, height, weight, goal

 */
module.exports.AuthUserShema = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "fr"] },
  }),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});

module.exports = { UserShema, userOption };
