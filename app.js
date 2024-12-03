//loading the express module
const express = require('express');
const env = require('dotenv').config();
//loading the cors for making the server cors free
const cors = require('cors');
const port = process.env.PORT;
const host = process.env.HOST;

//loading medicineRouter
const medicineRouter = require("./routes/medicines.routes");

//loading userRouter
const userRouter = require("./routes/user.routes");
const orderRouter = require('./routes/orders.routes');

//create an instance of express
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true })); //incoming post request
app.use(express.json());

//API
app.use("/api/medicines", medicineRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

//SSR= Server Static Resource
app.use(express.static("public"));

//creating landing routing api
app.get("/", (req, res) => {
    res.send("<h1>Welcome to medicinePRO REST API</h1>");
});
app.listen(port, host, () => {
    console.log(`Express server has started at http://${host}:${port}/`);
});
