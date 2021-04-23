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

exports.updateStockPurchase = (req, res, next) => {
  Product.findById(req.purchase.product._id).exec((err, product) => {
    if (err || !product) {
      return res.status(400).json({
        error: "product does not exist",
      });
    }
    let productUpdate = product;
    //
    if (req.body.status == "ACEPTAR") {
      //AGREGAR
      productUpdate.stock = productUpdate.stock + req.purchase.quantity;
      productUpdate.units_order =
        productUpdate.units_order - req.purchase.quantity;
    } else {
      //QUITAR
      productUpdate.stock = productUpdate.stock - req.purchase.quantity;
    }
    productUpdate.save((err, doc) => {
      if (err) {
        res.status(400).json(err);
      } else {
        next(); 
      }
    });


  });

  
};

exports.validateQuantityOrder = (req, res, next) => {
  Product.findById(req.body.product).exec((err, product) => {
    if (err || !product) {
      return res.status(400).json({
        error: "product does not exist",
      });
    }
    if (product.stock >= req.body.quantity) {
      req.product = product;
      next();
    } else {
      return res.status(400).json({
        error: "No existe stock suficiente",
      });
    }
  });
};

exports.discountStock = (req, res, next) => {
  let product = req.product;
  product.stock = product.stock - req.body.quantity;
  product.save((err, doc) => {
    if (err) {
      res.status(400).json(err);
    } else {
      next();
    }
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
  let product = req.product;
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
  console.log(req.purchaseOrder);
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
