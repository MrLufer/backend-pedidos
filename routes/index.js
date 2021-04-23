const express = require('express');
const { login, createAdmin, createEmployee } = require('../controllers/auth.controller');
const { getOrders, createOrder } = require('../controllers/order.controller');
const { finishPurchaseOrder, createProduct, listProducts,listProductsActives, validateQuantityOrder, discountStock } = require('../controllers/product.controller');
const { createPurchaseOrder, getPurchaseOrders } = require('../controllers/purchase_order.controller');
const { createSupplier, listSupplier, listSupplierAtives, updateSupplier, supplierById } = require('../controllers/supplier.controller');
const { getEmployees } = require('../controllers/user.controller');
const api = express();

//crear orden de compra
api.post("/purchase-order",createPurchaseOrder,finishPurchaseOrder)
//lista de ordenes
api.get("/purchase-orders",getPurchaseOrders)


//pedidos


api.get("/get-orders",getOrders)
api.post("/create-order",validateQuantityOrder,discountStock,createOrder)


//crear producto 
api.post("/product",createProduct)
//lista de productos
api.get("/products",listProducts)
//lista de productos activos
api.get("/products-active",listProductsActives)

//crear proveedor
api.post("/supplier",createSupplier)
//lista de proveedores
api.get("/suppliers",listSupplier)
//lista de proveedores activos 
api.get("/suppliers-active",listSupplierAtives)
//editar proveedor
api.put("/supplier/:supplierId",updateSupplier)


//auth
api.post('/login', login);
//create Admin
api.post("/create-admin",createAdmin)
//create Employee
api.post("/create-employee",createEmployee) 

api.get("/get-employees",getEmployees)

//PARAMS
api.param("supplierId",supplierById)

module.exports = api;