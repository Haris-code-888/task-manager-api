
import mongoose from "mongoose"

export function title(req,res,next){
    if (!req.body.task){

        return res.status(400).json({field: "Task",message:"Task is required"})
    } else {
        next()
    }
}

export function id_check(req,res,next){
    
        const isValid = mongoose.Types.ObjectId.isValid(req.params.task_id);
        if(!isValid){
            return res.status(400).json({field: "_id", message: "Invalid id format"})
        } else next()

}