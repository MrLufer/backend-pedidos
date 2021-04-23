/*=============================================
ESQUEMA PARA EL MODELO CONECTOR A MONGODB
=============================================*/
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
let Schema = mongoose.Schema;

let UserSchema = new Schema(
  {
    user: {
      type: String,
      required: true, unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    f_name: { type: String, required: true },
    l_name: { type: String, required: true },
    phone_number: {
      type: Number,
    },
    rol: {
      type: String,
      enum: ["ADMIN", "EMPLOYEE"],
    },
    discontinued: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
UserSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User", UserSchema);
