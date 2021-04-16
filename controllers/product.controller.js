const Product = require("../models/product.model");

exports.createProduct = (req, res) => {
  let product = new Product(req.body);
  product.save((err, product) => {
    if (err) {
      res.status(400).json(err);
    }
    res.status(200).json(product);
  });
};

exports.listProducts = (req, res) => {
  Product.find().exec((err, products) => {
    if (err) {
      res.status(400).json(err);
    }
    res.status(200).json(products);
  });
};

exports.listProductsActives = (req, res) => {
  Product.find({ discontinued: false }).exec((err, products) => {
    if (err) {
      res.status(400).json(err);
    }
    res.status(200).json(products);
  });
};

exports.updateProduct = (req, res) => {
  const product = req.product;
  Object.assign(product, req.body);
  product.save((err, doc) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(doc);
    }
  });
};

exports.deleteProduct = (req, res) => {
  Product.deleteOne({ _id: req.product._id }).exec((err) => {
    if (err) {
      return res.status(400).json(err);
    }
    return res.status(200).json("Se a borrado el evento");
  });
};

exports.showProduct = (req, res) => {
  res.status(200).json(req.product);
};

exports.productById = (req, res, next, id) => {
  Product.findById(id).exec((err, product) => {
    if (err || !product) {
      return res.status(400).json({
        error: "product does not exist",
      });
    }
    req.product = product;
    next();
  });
};

exports.finishPurchaseOrder = (req, res) => {

  console.log(req.purchaseOrder)
  Product.findById(req.purchaseOrder.product, function (err, doc) {
    if (err) {
      res.status(400).json(err);
    }
    doc.units_order = doc.units_order + req.purchaseOrder.quantity;
    doc.purchase_price = req.purchaseOrder.unit_price;
    doc.save((err, product) => {
      if (err) {
        res.status(400).json(err);
      }
      res.status(200).json(product);
    });
  });
};
