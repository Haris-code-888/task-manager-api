import express from "express"
// import { data } from './data.js';

import authRoutes from "./routes/authRoutes.js"
import taskRoutes from "./routes/taskRoutes.js"



const app = express()

app.use(express.json())


app.get("/",(req,res)=> {
   return  res.json({message: "API is alive", health: "Good"})
})


app.use("/api/auth",authRoutes)
app.use("/api/tasks",taskRoutes)


app.use((error,req,res,next)=>{

        return res.status(500).json({messgae:"Any error occur on server side"})
    })
    


export default app;