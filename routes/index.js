const express = require('express');
const { login, createAdmin, createEmployee } = require('../controllers/auth.controller');
const { finishPurchaseOrder, createProduct, listProducts,listProductsActives } = require('../controllers/product.controller');
const { createPurchaseOrder, getPurchaseOrders } = require('../controllers/purchase_order.controller');
const { createSupplier, listSupplier, listSupplierAtives, updateSupplier, supplierById } = require('../controllers/supplier.controller');
const api = express();

//crear orden de compra
api.post("/purchase-order",createPurchaseOrder,finishPurchaseOrder)
//lista de ordenes
api.get("/purchase-orders",getPurchaseOrders)


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

//PARAMS
api.param("supplierId",supplierById)

module.exports = api;