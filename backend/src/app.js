const express = require("express");
const cors = require("cors");
const path = require("path");

const productRouter = require("./routes/producatRouters"); 
const userRouter = require("./routes/userRouter");
const errorMiddleware = require("./middlewares/errorMiddleware");
const childProductrouter = require("./routes/childProductRouter");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

app.use("/uploads", express.static(path.join(__dirname, "uploads")))
app.use("/api/products", productRouter);
app.use("/api/user", userRouter);
app.use("/api/childproduct",childProductrouter)

app.use(errorMiddleware);

module.exports = app;
