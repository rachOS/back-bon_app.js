const Joi = require("joi");
const {
  USER_EMAIL_VALIDATION,
  USER_PASSWORD_VALIDATION,
} = require("../functions/CONST");

module.exports.UsersShema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "fr"] },
    })
    .required()
    .messages(USER_EMAIL_VALIDATION),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required()
    .messages(USER_PASSWORD_VALIDATION),
});

/*
 name, age, height, weight, goal
 look how o insert error message option here
 */
module.exports.AuthUserShema = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "fr"] },
  }),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});
