module.exports.new_user = (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  res.send("user created");
};
module.exports.auth_user = (req, res) => {
  const { email, password } = req.body;
  res.send("user logged in");
};

module.exports.logout_user = (req, res) => {
  res.send("./src/App.js");
};
