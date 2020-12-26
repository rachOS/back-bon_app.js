const MESSAGE =
  "Erreur de validation lors de la création d'un.e utilisateur.trice";

module.exports.USER_EMAIL_VALIDATION = {
  "string.base": MESSAGE,
  "string.email": "Vous devez renseigner un email pour créer votre compte",
  "string.empty": "Un email valide doit être renseigné ex : john@doe.com",
};

module.exports.USER_PASSWORD_VALIDATION = {
  "string.base": MESSAGE,
  "string.empty": "Vous devez renseigner un mot de passe.",
  "string.pattern.base":
    "Votre password doit comporter entre 3 et 30 characteres a-A 0-9",
};

module.exports.ERROR_MESSAGE = MESSAGE;
