const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
let Schema = mongoose.Schema;

let ClientSchema = new Schema(
  {
    name_or_socialreason: { type: String, required: true },
    n_doc: { type: String, unique: true },
    t_doc: {
      type: String,
      enum: ["DNI", "RUC"],
    },
    discontinued: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
ClientSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Client", ClientSchema);
