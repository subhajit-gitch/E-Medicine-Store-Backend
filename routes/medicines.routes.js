const express = require('express');
const mongoose = require('mongoose');
const medicineRouter = express.Router();
//consuming the medicineModel
const medicineModel = require("../models/medicines.model");
//consuming database connection.
const dbcon = require("../models/connection");
//consuming the middleware
const checkAuth = require("../middleware/check.auth");
const checkJWTAdmin = require('../middleware/check.admin');
//reading all medicines from the database
medicineRouter.get("/all", checkAuth, (req, res) => {
    medicineModel.find({}).exec()
        .then((medicineInfo) => {
            res.status(200).json(medicineInfo);
        })
        .catch((error) => {
            res.status(200).json(error);
        })
});
//reading or getting perticular data from mongodb depebds on _id
medicineRouter.get("/show/:mid", checkAuth, (req, res) => {
    let medicineID = req.params.mid;
    medicineModel.findOne({ "_id": medicineID })
        .exec()
        .then((medicineInfo) => {
            if (medicineInfo) {
                res.status(200).json(medicineInfo);
            } else {
                res.status(200).json({ "message": "no such medicines found" });
            }
        })
        .catch((error) => {
            res.status(200).json(error);
        })
});
//adding a new medicine
medicineRouter.post("/add", checkAuth, checkJWTAdmin, (req, res) => {
    medicineModel.create({
        'medicine_name': req.body.mname,
        'medicine_comp': req.body.mcomp,
        'medicine_price': req.body.mprice,
        "used_for": req.body.used_for
    })
        .then((medicineInfo) => {
            //res.status(200).json(medicineInfo);
            if (medicineInfo) {
                res.status(200).json({ "message": "medicine_add_success" });
            } else {
                res.status(200).json({ "message": "medicine_add_error" });
            }
        })
        .catch((error) => {
            res.status(200).json({ "message": error });
        });

});




//delete medicines depends on _id
medicineRouter.delete("/delete/:mid", checkAuth, (req, res) => {
    medicineModel.deleteOne({ "_id": req.params.mid })
        .then((medicineInfo) => {
            if (medicineInfo.deletedCount) {
                res.status(200).json({ "message": "medicine_delete_success" });
            } else {
                res.status(200).json({ "message": "medicine_delete_error" });
            }
        })
        .catch((error) => {
            res.status(200).json(error);
        })
});
//update a medicine depends on _id
medicineRouter.all("/update/:mid", checkAuth, (req, res) => {
    if (req.method == 'PUT' || req.method == 'PATCH') {
        var medicineId = req.params.mid;
        medicineModel.updateOne(
            { "_id": medicineId },
            {
                $set: {
                    "medicine_name": req.body.mname,
                    "medicine_comp": req.body.mcomp,
                    "used_for": req.body.used_for,
                    "medicine_price": req.body.mprice
                }
            })
            .then((medicineInfo) => {
                //  res.status(200).json(medicineInfo);
                if (medicineInfo.modifiedCount) {
                    res.status(200).json({ "message": "medicine_update_success" });
                } else {
                    res.status(200).json({ "message": "medicine_update_error" });
                }
            })
            .catch((error) => {
                res.status(200).json(error);
            })
    } else {
        res.status(200).json(req.method + " is not supported please send requiest either in put or patch");
    }
});

module.exports = medicineRouter;
console.log("medicine router is ready to use");
