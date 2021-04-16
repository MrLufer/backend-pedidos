/*=============================================
ESQUEMA PARA EL MODELO CONECTOR A MONGODB
=============================================*/
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
let Schema = mongoose.Schema;

let SupplierSchema = new Schema(
  {
    ruc: {
      type: Number,
    },
    name: { type: String },
    name_business: { type: String },
    address: {
      type: String,
    },
    phone_number: {
      type: Number,
    },
    business_line: {
      type: String,
    },
    discontinued: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Supplier", SupplierSchema);
