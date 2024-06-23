import mongoose from "mongoose";

export const db = () => {
    mongoose.connect(process.env.DB_URI).
    then(()=> {
        console.log("Database Connected Successfully!")
    }).catch((err)=> {
        console.log("Failed to Connect Database")
    })
}