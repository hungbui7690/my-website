/*
  Model vs Controller vs Routes

  1. connect/connectDB.ts

  2. model/Post.ts
    -> Schema Type in Mongoose

  3. controller/Post.ts
  4. routes/Post.ts
  5. app.ts

*/

import express from 'express'
import connectDB from './db/connect'
import postRoute from './routes/Post'

const app = express()

app.use(express.json())

app.get('/ping', (_, res) => {
  res.send('🏓 pong!')
})

// post routes
app.use('/api', postRoute)

// error route
app.all('*', (req, res) => {
  res.status(404).send('NOT FOUND')
})

app.listen(5000, async () => {
  await connectDB()
  console.log('The magic happens on port 5000!')
})
