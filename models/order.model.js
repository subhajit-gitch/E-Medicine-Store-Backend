const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    'order_id': { type: String, required: [true, 'orderid is needed'], unique: true },
    'order_date': { type: Date, required: [true, 'order date is need'], default: new Date() },
    'user_id': { type: mongoose.Types.ObjectId, required: true, ref: 'userModel' },
    'medicine_id': { type: mongoose.Types.ObjectId, required: true, ref: 'medicineModel' }
}, { versionKey: false });

module.exports = mongoose.model('orderModel', orderSchema, 'ordersinfo');

console.log('order model is ready to use')