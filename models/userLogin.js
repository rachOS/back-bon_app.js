const connection = require("../config");
const instance = null;
class UserLogin {
  static getDbServiceInstance() {
    return instance ? instance : new UserLogin();
  }
  async login(email, password) {
    try {
      const response = new Promise((resolve, reject) => {
        const query = "SELECT u.*  FROM `user` as u WHERE u.email = ?";
        connection.query(query, [email, password], (err, results) => {
          console.log(err);
          if (err) reject(new Error(err));
          resolve(results);
        });
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = UserLogin;
