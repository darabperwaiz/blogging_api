import { User } from "../model/User.js"
import bcyrpt from "bcryptjs"
import jwt from "jsonwebtoken"

export const signup = async (req, res) => {
    const {name, email, password} = req.body

    if(!name.trim() || !email || !password) {
        return res.status(400).send("All Fields Required")
    }

    const userEmail = await User.findOne({email})
    if(userEmail) {
        return res.status(400).send('User already Exist')
    }

    try {
        const hashedPassword = await bcyrpt.hash(password, 10)
        const user = await User({name, email, password: hashedPassword})
        const savedUser = await user.save()
        return res.status(201).send({success: true, message: "User Created Successfully!" })
    } catch (error) {
        console.log(error)
        return res.status(400).send({message: "Something went wrong!", error: error})
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await User.findOne({email})
        if(!user) {
            return res.status(400).send({success: false, message: "User not found!"})
        }

        const verifyPassword = await bcyrpt.compare(password, user.password)
        if(!verifyPassword) {
            return res.status(400).send({success: false, message: "password not matched"})
        }

        const payload = {
            id: user._id,
            name: user.name,
            email: user.email
        }

        const token = await jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: "1d"})
        res.cookie('jwt', token, {httpOnly: true, secure: true, maxAge: 3600000})
        return res.status(200).send({success: true, token: token})

    } catch (error) {
        return res.status(400).send("Something Went Wrong!")
    }
}