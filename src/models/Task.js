import {Schema,model, now} from "mongoose"


const task_schema = new Schema({
    task : {
        type: String,
        required : true,
    },
    
    description : String,
    completed :{
        type : Boolean,
        default : false,
    } ,

    createdAt : {
        type : Date,
        default : now(),
    },

    user :{
        type : Schema.Types.ObjectId,
        ref : 'User',
        required: true,
    }
})

export const Task = model("Task", task_schema)