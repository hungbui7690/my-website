import express from 'express'
const router = express.Router()
import { createPost, getAllPosts, updatePost } from '../controller/post'
import { uploadProductImage } from '../controller/uploadImage'

router.post('/uploadImage', uploadProductImage)
router.post('/', createPost)
router.get('/', getAllPosts)
router.patch('/:id', updatePost)

export default router
