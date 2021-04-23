const Order = require("../models/order.model");

exports.getOrders = (req, res) => {
  Order.find()
    .populate("supplier")
    .populate("product")
    .exec((err, docs) => {
      if (err) {
        res.status(400).json(err);
      }
      res.status(200).json(docs);
    });
};

exports.createOrder = (req, res, next) => {
  let order = Order(req.body);

  order.save((err, data) => {
    if (err) {
      res.status(400).json(err);
    }
    res.status(200).json(data)
  });
};
