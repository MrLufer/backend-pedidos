/*=============================================
ESQUEMA PARA EL MODELO CONECTOR A MONGODB
=============================================*/
const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let ProductSchema = new Schema(
  {
    code_product: {
      type: String,
    },
    name_product: { type: String },
    supplier:{type:Schema.Types.ObjectId, ref:'Supplier'},
    stock: {
      type: Number,default:0 
    },
    quantity_unit: { type: Number },
    units_order: { type: Number, default:0 },
    sale_price:{
      type:Number
    },
    purchase_price:{
      type:Number
    },
    discontinued: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
