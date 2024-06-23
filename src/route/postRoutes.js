import express from "express"
import { createPost, deletePostById, getAllPosts, getPostByPostId, getPostByUserId, updatePostById } from "../controller/post.js"
import { verifyToken } from "../auth/auth.js"


const postRoute = express.Router()

postRoute.post('/create-post', verifyToken, createPost)
postRoute.get('/:userId', getPostByUserId)
postRoute.get('/post/:id', getPostByPostId)
postRoute.delete('/delete/:id', deletePostById)
postRoute.put('/update/:id', verifyToken, updatePostById)
postRoute.get('/', getAllPosts)

export default postRoute