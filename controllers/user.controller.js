const User = require("../models/user.model");

exports.getEmployees = (req, res) => {
  User.find({ rol: "EMPLOYEE" }).exec((err, data) => {
    if (err) {
      res.status(400).json(err);
    }
    res.status(200).json(data);
  });
};
