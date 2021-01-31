const Joi = require("joi");
const { ERROR_MESSAGE } = require("../../helper/ERRORS");

module.exports.LoginShema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "fr"] },
    })
    .required()
    .messages(ERROR_MESSAGE.USER.AUTH),
  password: Joi.string().min(8).required().messages(ERROR_MESSAGE.USER.AUTH),
  //repeat_password: Joi.ref("password"),
});
module.exports.userOption = {
  abortEarly: false,
  warning: true,
};
