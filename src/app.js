

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


app.get("/",(req,res)=> {
   return  res.json({message: "API is alive", health: "Good"})
})




app.use((error,req,res,next)=>{

        return res.status(500).json({messgae:"Any error occur on server side"})
    })
    


export default app;