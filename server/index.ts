// https://documenter.getpostman.com/view/13813451/2sAXjNYrTA#fddf3ab3-1c7e-42dc-ae30-2c02c7322f2b

// @ts-ignore
import { xss } from 'express-xss-sanitizer'
import express from 'express'
import 'express-async-errors'
import path from 'path'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import cors from 'cors'
import { rateLimit } from 'express-rate-limit'
import mongoSanitize from 'express-mongo-sanitize'
import fileUpload from 'express-fileupload'
import { v2 as cloudinary } from 'cloudinary'
import connectDB from './db/connect'
import postRoute from './routes/post'
import authRoute from './routes/auth'
import notFoundMiddleware from './middleware/not-found'
import errorHandlerMiddleware from './middleware/error-handler'
const app = express()

const xssOptions = {
  allowedKeys: ['name'],
  allowedAttributes: {
    input: ['value'],
  },
}
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   limit: 100,
//   standardHeaders: 'draft-7',
//   legacyHeaders: false,
// })

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
})

app.use(express.json())
app.use(fileUpload({ useTempFiles: true }))
app.use(express.static('public'))
app.use('/static', express.static(path.join(__dirname, 'public', 'images'))) // http://localhost:5000/static/default-image.png
app.set('trust proxy', 2)
// app.use(limiter)
app.use(xss(xssOptions))
app.use(morgan('tiny'))
app.use(helmet())
app.use(cors())
app.use(xss())
app.use(mongoSanitize())
app.use(cookieParser(process.env.JWT_SECRET))

app.get('/ip', (request, response) => response.json(request.ip))

app.get('/ping', (_, res) => {
  res.send('🏓 Pong!!')
})

// routes
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/post', postRoute)

// middlewares
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

// start server
const port = process.env.PORT || 5000
const start = async () => {
  await connectDB()

  app.listen(5000, async () => {
    console.log('The magic happens on port 5000!')
  })
}
start()
