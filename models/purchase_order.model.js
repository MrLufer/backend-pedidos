/*=============================================
ESQUEMA PARA EL MODELO CONECTOR A MONGODB
=============================================*/
const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let PurchaseOrderSchema = new Schema(
  {
    code: {
      type: String,required:true
    },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    supplier: { type: Schema.Types.ObjectId, ref: "Supplier",required:true },
    product: { type: Schema.Types.ObjectId, ref: "Product",required:true },
    unit_price: { type: Number,required:true },
    quantity: { type: Number,required:true },
    status: {
      type: String,
      enum: ["PROCESO", "CANCELADO", "ACEPTADO"],
      default: "PROCESO",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PurchaseOrder", PurchaseOrderSchema);
