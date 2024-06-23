import express from "express"
import dotenv from "dotenv"
dotenv.configDotenv()
import { db } from "./src/config/db.js"
import userRouter from "./src/route/userRoutes.js"
import postRoute from "./src/route/postRoutes.js"
import cookieParser from "cookie-parser"
import cors from "cors"

const PORT = process.env.PORT || 4000

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())

app.use('/api/v1/user/', userRouter)
app.use('/api/v1/posts/', postRoute)

app.use('/', (req, res)=> {
    return res.status(200).json({"message": "Welcome to blog api"})
})



app.listen(PORT, ()=> {
    console.log("Server is Running on PORT ", PORT)
    db()
})
