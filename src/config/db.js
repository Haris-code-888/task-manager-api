import mongoose from "mongoose";


export async function Connecting(uri) {
    try {

        await mongoose.connect(uri)
        console.log("Connected Successfully")

    } catch(e){
        console.error(e)
    }
}
