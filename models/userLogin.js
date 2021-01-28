const connection = require("../config");
const instance = null;
class UserLogin {
  static getDbServiceInstance() {
    return instance ? instance : new UserLogin();
  }
  async login() {
    try {
      const response = new Promise((resolve, reject) => {
        const query = "SELECT u.* , u.id FROM `user` as u";
        connection.query(query, (err, results) => {
          if (err) reject(new Error(err.message));
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
