const mongoose = require('mongoose');
const SignUpSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter a name"],
    },
    count:{
        type:Number,
        required:true,
        default: 1
    }
})

module.exports = mongoose.models.SignUp || mongoose.model('SignUp', SignUpSchema)