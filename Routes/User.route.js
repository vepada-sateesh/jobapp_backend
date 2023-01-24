const express = require("express")
const { userModel } = require("../Models/User.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userRoute = express.Router()

userRoute.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    let userexist = await userModel.findOne({ email });
    try {
        if (userexist) {
            res.send({data:"user already exists"})
        } else {
            bcrypt.hash(password, 5, async (err, hash) => {
                let user = new userModel({ name, email, password: hash })
                await user.save();
                res.send({data:"user registered success"})
            })
        }
    } catch (error) {
        console.log(error.message)
    }
})




userRoute.post("/login", async (req, res) => {
    const { email, password } = req.body;
    let finduser = await userModel.find({ email })
    if (finduser.length > 0) {
        try {
            let hpass = finduser[0].password;
            bcrypt.compare(password, hpass, async (err, result) => {
                if (result) {
                    var token = jwt.sign({ userID: finduser[0]._id }, "secret");
                    res.send({"data":"login success","token":token})
                } else {
                    res.send("please signup")
                }
            })
        } catch (error) {
            console.log(error.message)
        }
    }
})



userRoute.post("/adminregister", async (req, res) => {
    const { name, email, password } = req.body;
    let userexist = await userModel.findOne({ email });
    try {
        if (userexist) {
            res.send({data:"user already exists"})
        } else {
            bcrypt.hash(password, 5, async (err, hash) => {
                let user = new userModel({ name, email, password: hash })
                await user.save();
                res.send({data:"user registered success"})
            })
        }
    } catch (error) {
        console.log(error.message)
    }
})


userRoute.post("/adminlogin", async (req, res) => {
    const { email, password } = req.body;
    let finduser = await userModel.find({ email })
    if (finduser.length > 0) {
        try {
            let hpass = finduser[0].password;
            bcrypt.compare(password, hpass, async (err, result) => {
                if (result) {
                    var token = jwt.sign({ userID: finduser[0]._id }, "secret");
                    res.send({"data":"admin login success","token":token})
                } else {
                    res.send("please signup")
                }
            })
        } catch (error) {
            console.log(error.message)
        }
    }
})


module.exports = {userRoute}