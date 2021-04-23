const PurchaseOrder = require("../models/purchase_order.model");

exports.createPurchaseOrder = (req, res, next) => {
  let purchaseOrder = PurchaseOrder(req.body);
  purchaseOrder.save((err, data) => {
    if (err) {
      res.status(400).json(err);
    }
    req.purchaseOrder = data;
    next();
  });
};






exports.getPurchaseOrders = (req, res) => {
  PurchaseOrder.find()
    .populate("supplier")
    .populate("product")
    .exec((err, docs) => {
      if (err) {
        res.status(400).json(err);
      }
      res.status(200).json(docs);
    });
};

exports.updatePurchaseOrder = (req, res) => {
  let purchase = req.purchase;

  if (req.body.status == "ACEPTAR") {
    purchase.status = "ACEPTADO";
  } else {
    purchase.status = "CANCELADO";
  }

  purchase.save((err, doc) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(doc);
    }
  });
};

exports.purchaseById = (req, res, next, id) => {
  PurchaseOrder.findById(id)
    .populate("product")
    .exec((err, purchase) => {
      if (err || !purchase) {
        return res.status(400).json({
          error: "purchase does not exist",
        });
      }
      req.purchase = purchase;
      next();
    });
};
