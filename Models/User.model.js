const mongoose = require("mongoose")

let userSchema = mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, require: true },
    name:{type:String}
})

const userModel = mongoose.model("Userlist", userSchema)
module.exports = {userModel}