const express = require("express");
const {
  login,
  createAdmin,
  createEmployee,
} = require("../controllers/auth.controller");
const { getOrders, createOrder, getUserOrders } = require("../controllers/order.controller");
const {
  finishPurchaseOrder,
  createProduct,
  listProducts,
  listProductsActives,
  validateQuantityOrder,
  discountStock,
  updateStockPurchase,
} = require("../controllers/product.controller");
const {
  createPurchaseOrder,
  getPurchaseOrders,
  updatePurchaseOrder,
  purchaseById,
} = require("../controllers/purchase_order.controller");
const {
  createSupplier,
  listSupplier,
  listSupplierAtives,
  updateSupplier,
  supplierById,
} = require("../controllers/supplier.controller");
const { getEmployees,userById } = require("../controllers/user.controller");
const api = express();

//crear orden de compra
api.post("/purchase-order", createPurchaseOrder, finishPurchaseOrder);
//lista de ordenes
api.get("/purchase-orders", getPurchaseOrders);

//pedidos

api.get("/get-orders", getOrders);
api.post("/create-order", validateQuantityOrder, discountStock, createOrder);
api.put(
  "/update-purchase/:purchaseId",
  updateStockPurchase,
  updatePurchaseOrder
);

api.get("/user-details/:userId",getUserOrders);

//crear producto
api.post("/product", createProduct);
//lista de productos
api.get("/products", listProducts);
//lista de productos activos
api.get("/products-active", listProductsActives);

//crear proveedor
api.post("/supplier", createSupplier);
//lista de proveedores
api.get("/suppliers", listSupplier);
//lista de proveedores activos
api.get("/suppliers-active", listSupplierAtives);
//editar proveedor
api.put("/supplier/:supplierId", updateSupplier);

//auth
api.post("/login", login);
//create Admin
api.post("/create-admin", createAdmin);
//create Employee
api.post("/create-employee", createEmployee);

api.get("/get-employees", getEmployees);

//PARAMS
api.param("supplierId", supplierById);
api.param("purchaseId", purchaseById);
api.param("userId", userById);
module.exports = api;
