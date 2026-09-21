

import { Task } from "../models/Task";




const getTaskById = async(req,res)=>{

    const tasks = await Task.find({ user: req.user.id });  // check this not done by you

    return res.status(200).json(tasks)

}


const createTask = async(req,res)=>{

        // const data = req.body;
        const taskData = { ...req.body, user: req.user.id };

        const result =  await Task.create(taskData )
        return res.status(201).json({message : "Created", result})

}

const updateTaskById = async(req,res)=>{

   
            const id = req.params.task_id
            const data = await Task.findOneAndUpdate(
                { _id: id, user: req.user.id },
                req.body,
                { new: true, runValidators: true }
             );
            
            // const data = await Task.findOneAndUpdate(id, Data, )

             if (!data){
            return res.status(404).json({message:"Not Found!!"})
        }
            return res.status(200).json({message:"Updated data",data})

}


const deleteTaskById = async(req,res)=>{
   
        const id = req.params.task_id

        // const data = await Task.findByIdAndDelete(id)

        const data = await Task.findOneAndDelete({ _id: id, user: req.user.id });

        if (!data){
            return res.status(404).json({message:"Not Found!!"})
        }
        return res.status(200).json({message: "Deleted Succesfully",data})


}



