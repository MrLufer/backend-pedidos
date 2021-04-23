const User = require("../models/user.model");

exports.getEmployees = (req, res) => {
  User.find({ rol: "EMPLOYEE" }).exec((err, data) => {
    if (err) {
      res.status(400).json(err);
    }
    res.status(200).json(data);
  });
};

exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "user does not exist",
      });
    }
    req.user = user;
    next();
  });
};
