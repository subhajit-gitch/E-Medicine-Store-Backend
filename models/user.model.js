const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    "name": { type: String, required: true },
    "email": {
        type: String,
        required: [true, "email is Required"],
        unique: true,
        validate: {
            validator: function (v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            "message": "Please enter a valid email address"
        }
    },
    "phone": {
        type: String,
        required: [true, "Mobile number is Required"],
        unique: true,
        validate: {
            validator: function (v) {
                return /^[6-9]\d{9}$/.test(v);
            },
            message: "Invalid Indian Mobile number"
        }
    },
    "pass1": { type: String, required: true },
    "role": { type: String, required: [true, 'role is default regular'], default: 'regular' },
    "created": { type: Date, required: true, default: new Date() }
}, { versionKey: false });//__v will not get generated.
//any name  //schema   //collections
module.exports = mongoose.model("userModel", userSchema, "users");
console.log("user model is created");