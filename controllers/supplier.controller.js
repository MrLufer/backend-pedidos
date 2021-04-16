const Supplier = require("../models/supplier.model");

exports.createSupplier = (req, res) => {
  let supplier = new Supplier(req.body);
  supplier.save((err, doc) => {
    if (err) {
      res.status(400).json(doc);
    }
    res.status(200).json(doc);
  });
};

exports.listSupplier = (req, res) => {
  Supplier.find().exec((err, suppliers) => {
    if (err) {
      res.status(400).json(err);
    }
    res.status(200).json(suppliers);
  });
};

exports.listSupplierAtives = (req, res) => {
  Supplier.find({ discontinued: false }).exec((err, supplier) => {
    if (err) {
      res.status(400).json(err);
    }
    res.status(200).json(supplier);
  });
};

exports.updateSupplier = (req, res) => {
  const supplier = req.supplier;
  Object.assign(supplier, req.body);
  supplier.save((err, doc) => {
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

exports.supplierById = (req, res, next, id) => {
  Supplier.findById(id).exec((err, supplier) => {
    if (err || !supplier) {
      return res.status(400).json({
        error: "supplier does not exist",
      });
    }
    req.supplier = supplier;
    next();
  });
};
