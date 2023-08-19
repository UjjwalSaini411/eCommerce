const express = require("express");
const app  = express();
app.use(express.json());

//route imports
const product = require("./routes/productRoute");

app.use("/api/vi",product)

module.exports = app