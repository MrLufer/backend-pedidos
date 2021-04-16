const PurchaseOrder = require("../models/purchase_order.model");

exports.createPurchaseOrder = (req, res, next) => {

   let purchaseOrder = PurchaseOrder(req.body)

   purchaseOrder.save((err, data) => {
    if (err) {
      res.status(400).json(err);
    }
    req.purchaseOrder = data;
    next();
  });
};

exports.getPurchaseOrders = (req, res) => {
    PurchaseOrder.find().exec((err, docs) => {
    if(err){
        res.status(400).json(err);
    }
    res.status(200).json(docs)

  });
};
