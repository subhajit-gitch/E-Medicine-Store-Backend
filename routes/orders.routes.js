const express = require('express');
const orderModel = require('../models/order.model');

const orderRouter = express.Router();

function generateOrderId() {
    return "order-" + Math.random() * 9999 + "-" + Date.now();
}

orderRouter.post("/buy/:uid/:mid", (req, res) => {
    let order_id = generateOrderId()
    orderModel.create({
        "order_id": order_id,
        "user_id": req.params.uid,
        "medicine_id": req.params.mid
    })
        .then((orderInfo) => {
            if (orderInfo) {
                res.status(200).json({ "message": "order Success", "order_id": order_id })
            }
            else {
                res.status(200).json({ "message": "order Failed" })
            }
        })
        .catch((error) => {
            res.status(200).json(error);
        })
});

orderRouter.post("/view", (req, res) => {
    orderModel.findOne({
        "order_id": req.body.order_id
    })
        .populate("user_id")
        .populate("medicine_id")
        .exec()
        .then((ordersinfo) => {
            if (ordersinfo) {
                res.status(200).json(ordersinfo);
            }
            else {
                res.status(200).json({ "message": "order not found" });
            }
        })
        .catch((error) => {
            res.status(200).json(error);
        })
});

module.exports = orderRouter;
console.log('order router is ready to use');