const mongoose = require('mongoose');
//connect to local mongodb.
module.exports =
    mongoose.connect("mongodb://127.0.0.1:27017/medicineDB")
        .then(() => {
            console.log("successfully connected to mongodb");
        })
        .catch((error) => {
            console.log(error);
        }).finally(() => {
            console.log("mongoose is ready for database operations");
        });
        