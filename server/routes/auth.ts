import express from 'express'
const router = express.Router()
import { register, login } from '../controller/auth'

router.post('/login', login)
router.post('/register', register)

export default router
