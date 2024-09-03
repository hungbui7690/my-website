/*
  Logging Requests
  - bun add morgan
    bun add @types/morgan -d


******************************

  Data validation in Express
  - To guarantee that the incoming data for your application is clean and structured to your specifications, the express-validator is an essential tool. It’s an excellent middleware option that simplifies validating and sanitizing your request data. Explore how to implement an express validator within your project.

  - bun add express-validator
    bun add -d @types/express-validator

  1. postRoute 


*/

import express from 'express'
import connectDB from './db/connect'
import postRoute from './routes/Post'
import morgan from 'morgan'

const app = express()

app.use(express.json())
app.use(morgan(':method :url :status :response-time ms'))

app.get('/ping', (_, res) => {
  res.send('🏓 pong!')
})

app.use('/api', postRoute)

app.all('*', (req, res) => {
  res.status(404).send('NOT FOUND')
})

app.listen(5000, async () => {
  await connectDB()
  console.log('The magic happens on port 5000!')
})
