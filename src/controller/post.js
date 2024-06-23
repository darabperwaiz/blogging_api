import { Post } from "../model/Post.js"
import { User } from "../model/User.js"

// Create Post
export const createPost = async (req, res) => {
    const userId = req.user.id
    const {title, body} = req.body

    try {
        const post = new Post({title, body, author: userId})
        const savedPost = await post.save()
        const user = await User.findById(userId)
        user.posts.push(savedPost._id)
        await user.save()
        return res.status(201).send(savedPost)
    } catch (error) {
        
    }
}


// Fetch all Posts
export const getAllPosts = async (req,res) => {
    try {
        const posts = await Post.find().populate("author", '-password -posts')

    if(posts.length==0) {
        return res.status(404).send("Post not found!")
    }

    return res.status(200).json(posts)
    } catch (error) {
        return res.status(400).send("Something went wrong!")
    }
}


export const getPostByPostId = async (req, res) => {
    const {id} = req.params
    const post = await Post.findById(id).populate("author", '-password -posts')
    return res.status(200).json(post)
}

// Get all Post by user Id
export const getPostByUserId = async (req, res) => {

    const user = await User.findById(req.params.userId)

   const posts = await user.populate("posts")
   if(posts.length == 0) {
    return res.status(200).send("Posts not Found!")
   }
   return res.status(200).json(posts.posts)
}

// Delete Post by User Id
export const deletePostById = async (req, res) => { 
    const post = await Post.findByIdAndDelete(req.params.id)
    return res.status(200).send("Post Deleted Successfully!")
}

// Update post by user Id
export const updatePostById = async (req, res) => {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body)
    const savedPost = await post.save()
    return res.status(200).send(savedPost)
}


