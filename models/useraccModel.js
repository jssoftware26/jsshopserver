import mongoose from "mongoose";

const useraccSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    phonenumber:{
        type: Number,
        required: true
    },
    address:{
        type: String,
        required: true
    }
},
{
    timestamps:true
});

const useraccModel = mongoose.model("useraccount", useraccSchema);
export default useraccModel;