module.exports.ERROR_MESSAGE = {
  USER: {
    CREATE: {
      MESSAGE:
        "Erreur de validation lors de la création d'un.e utilisateur.trice",
      EMAIL: {
        "string.empty":
          "Vous devez renseigner un email pour créer votre compte",
        "string.email": "Un email valide doit être renseigné ex : john@doe.com",
      },
      PASSWORD: {
        "string.empty": "Vous devez renseigner un mot de passe.",
        "string.min": "Votre password doit comporter minimum 8 charactères",
        "any.only": "Vos mots de passe ne sont pas identiques",
      },
    },
    AUTH: {
      MESSAGE: "Erreur d'authentification",
      EMAIL: {
        "string.empty":
          "Veuillez renseigner un email pour vous connecter à votre compte",
        "string.email": "Veuillez renseigner un email valide",
      },
      PASSWORD: {
        "string.empty": "Vous devez renseigner un mot de passe.",
        "any.only": "Vos mots de passe ne sont pas identiques",
      },
    },
  },
};
