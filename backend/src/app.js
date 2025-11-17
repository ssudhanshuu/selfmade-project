const express = require("express");
const cors = require("cors");
const path = require("path");
const  router= require("./routes/producatRouters");
const errorMiddleware = require("./middlewares/errorMiddleware");

const app = express();

app.use(cors({}));
app.use(express.json());


app.use("/uploads", express.static("uploads"));


app.use("/api/products",router);


app.use(errorMiddleware);

module.exports = app;
