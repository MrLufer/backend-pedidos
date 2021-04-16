/*=============================================
ESQUEMA PARA EL MODELO CONECTOR A MONGODB
=============================================*/
const mongoose = require("mongoose");
let Schema = mongoose.Schema;
let OrderSchema = new Schema(
  {
    code_product: {
      type: String,
    },
    name_product: { type: String },
    supplier: { type: String },
    stock: {
      type: Number,
    },
    quantity_unit: { type: Number },
    units_order: { type: Number },
    unit_price: {
      type: Number,
    },
    discontinued: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
