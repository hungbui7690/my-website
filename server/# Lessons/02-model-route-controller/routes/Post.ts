import express from 'express'

const router = express.Router()

import {
  createPost,
  getSinglePost,
  getAllPosts,
  updatePost,
  deletePost,
} from '../controller/Post'

router.post('/post', createPost)
router.get('/posts', getAllPosts)
router.get('/post/:id', getSinglePost)
router.put('/post/:id', updatePost)
router.delete('/post/:id', deletePost)

export default router
