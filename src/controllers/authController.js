import {User} from "../models/User"
import {hash_password} from "../utils/hashing"
import { verify_password } from "../utils/hashing"
import jwt from "jsonwebtoken"


export const Signup = async(req,res)=>{

    const data = req.body

    data.password = await hash_password(data.password)

    const result = await User.create(data)

    res.status(201).json({msg : "user is created with data"} , result)

    

}


export const Signin = async(req,res)=>{
    const data = req.body

    const user = await User.findOne({email : data.email})
    if (!user){
        return res.status(404).json({msg : "Not found! Put valid email"})
    }

    const result = await verify_password(user.password,data.password)

    if(!result){
        return res.status(401).json({msg: "Password not match"})
    }

    const token = jwt.sign({id : user._id},process.env.JWT_SECRET, { expiresIn: '1h' }  )

      return res.status(200).json({
        success: true,
        message: "Authentication successful!",
        token: token 
    });

    

}