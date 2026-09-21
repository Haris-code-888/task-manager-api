import { Schema,model, } from "mongoose";

const User_model = new Schema({
    email: {
        type : String,
        required: true,
        match : /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        unique : true
    },

    password : {
        type : String,
        required : true,
    }
})


export const User = model("User", User_model)