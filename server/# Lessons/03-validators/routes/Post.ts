import express from 'express'

const router = express.Router()

import {
  createPost,
  getSinglePost,
  getAllPosts,
  updatePost,
  deletePost,
} from '../controller/Post'

// 1.
const { body } = require('express-validator')

// 2. create validator
// export const postValidator = [
//   body('title').notEmpty(),
//   body('content').notEmpty(),
//   body('author').notEmpty(),
// ]

router.post('/posts', createPost) // 3. apply validator
router.get('/posts', getAllPosts)
router.get('/posts/:id', getSinglePost)
router.put('/posts/:id', updatePost)
router.delete('/posts/:id', deletePost)

export default router
