module.exports.getAll = (req, res) => {
  res.send("Get all user");
};

module.exports.getById = (req, res) => {
  res.send("Get user by id");
};

module.exports.createUser = (req, res) => {
  res.send("Create all user");
};

module.exports.updateUserById = (req, res) => {
  res.send("update user by id");
};
module.exports.deleteUserById = (req, res) => {
  res.send("delete user by id");
};
