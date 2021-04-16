
require('./config');
const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// Load routes

const orderRoutes = require("./routes/index")
// Load Keys
const keys = require("./config/keys");

// Map global promise
mongoose.Promise = global.Promise;
// Mongoose connect
 mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
},(err,res)=>{
    if(err)throw err;
    console.log("Conectado a la base de datos")

}
);
//initializations
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//Settings
app.set("port", process.env.PORT || 6666);

//Routes

app.use("/api", orderRoutes);


//Server is listening
app.listen(app.get("port"), () => {
  console.log("server on port", app.get("port"));
});
