const connection = require("../config");
const { handleErrors } = require("../helper/handleErrors");
const instance = null;

class User {
  static getDbServiceInstance() {
    return instance ? instance : new User();
  }

  async createUser(userForm) {
    try {
      const response = new Promise((resolve, reject) => {
        const query = "INSERT INTO `user` SET ?";
        connection.query(query, [userForm], (err, results) => {
          if (err) reject(new Error(err));
          return resolve(results);
        });
      });

      return response;
    } catch (error) {
      return handleErrors(error);
    }
  }
  async login(email, password) {
    try {
      const response = new Promise((resolve, reject) => {
        const query = "SELECT u.*  FROM `user` as u WHERE u.email = ?";
        connection.query(query, [email, password], (err, results) => {
          if (err) reject(new Error(err));
          resolve(results);
        });
      });
      return response;
    } catch (error) {
      return handleErrors(error);
    }
  }
  async getUserDatas(id) {
    try {
      const response = new Promise((resolve, reject) => {
        const query = "SELECT u.*  FROM `user` as u WHERE u.id = ?";
        connection.query(query, [id], (err, results) => {
          console.log(err);
          if (err) reject(new Error(err));
          resolve(results);
        });
      });
      return response;
    } catch (error) {
      return handleErrors(error);
    }
  }
}

module.exports = User;
