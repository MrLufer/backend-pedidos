/*=============================================
ESQUEMA PARA EL MODELO CONECTOR A MONGODB
=============================================*/
const mongoose = require("mongoose");
let Schema = mongoose.Schema;
let OrderSchema = new Schema(
  {
    code: {
      type: String,required:true
    },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    product: { type: Schema.Types.ObjectId, ref: "Product",required:true },
    unit_price: { type: Number,required:true },
    quantity: { type: Number,required:true },
    status: {
      type: String,
      enum:  ["CANCELADO", "ACEPTADO"],
      default: "ACEPTADO",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
