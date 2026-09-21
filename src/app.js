

import express from "express"
// import { data } from './data.js';

import { Task } from './models/Task.js';
import { User } from './models/User.js';
import { title,id_check } from './validation.js';
import { hash_password,verify_password } from './hashing.js';
import jwt from "jsonwebtoken"
import { protect } from './protect.js';






const app = express()

app.use(express.json())





app.get("/",protect,(req,res)=> {
   return  res.json({message: "API is alive"})
})


app.get("/tasks",protect,async(req,res)=>{

    const tasks = await Task.find({ user: req.user.id });  // check this not done by you

    return res.status(200).json(tasks)

})

app.get("/tasks/:task_id", protect, id_check, async(req,res)=>{
    const id = req.params.task_id


    // const task = data.find((t)=> t.id === Number(id))     Array Logic

    const task = await Task.findById(id).exec()  /// exec() command
    

    if(!task) {
        return res.status(404).json({message : "Not valid id"})
    }

    return res.status(200).json(task)

})

app.post("/tasks", protect,title, async(req,res)=>{
    // try {

        const data = req.body;

        const result =  await Task.create(data,{user : req.user.id } )
        return res.status(201).json({message : "Created", result})

    // } catch(e){
    //     console.error(e)
    //     return res.status(404).json({message : "Title is missing "})
    // }

    // data.push(Task_data)

    

})

app.put("/tasks/:task_id",protect, id_check, async(req,res)=>{

    // try {
            const id = req.params.task_id
            const Data = req.body
             // const index = data.findIndex((obj)=> obj.id === (id))
            const data = await Task.findByIdAndUpdate(id, Data, )
             if (!data){
            return res.status(404).json({message:"Not Found!!"})
        }
            return res.status(200).json({message:"Updated data",data})

    // } catch(e){
    //     console.error(e)
    //     return res.status(404).json({messgae:"Not Found"})
    // }
   
        //  data[index] = Data
     



})

app.delete("/tasks/:task_id" ,protect, id_check, async(req,res)=>{
    // try {
        const id = req.params.task_id

        //  const index = data.findIndex((obj)=> obj.id === Number(id))
        const data = await Task.findByIdAndDelete(id)

        if (!data){
            return res.status(404).json({message:"Not Found!!"})
        }
        return res.status(200).json({message: "Deleted Succesfully",data})


    // } catch(e){
    //     console.error(e);
    //     return res.status(404).json({messgae:"Any error occur"})

    // }
    
    // data.pop(index)


})

app.use((error,req,res,next)=>{

        return res.status(500).json({messgae:"Any error occur on server side"})
    })
    


export default app;