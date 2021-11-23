const mongoose = require('mongoose');
const signUpSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:[true,"Please enter a name"],
    },
    PhoneNumber:{
        type:Number,
        required:true,
        maxlength:[10,"Number must be only contain 10 digits"]
    },
    EmailAddress:{
        type: String,
    required: true,
    match: /.+\@.+\..+/,
    unique: true
    },
    Password:{
        type:String,
        required:true,
    }
})

mongoose.models={};

var SignUp = mongoose.model('SignUp',signUpSchema);

export default SignUp;