/*
  Basic Setup
  - building an Express.js API backed with MongoDB, powered by Bun

    + Express.js: It is a sleek and straightforward web framework seamlessly integrated with Node.js. It lets users build APIs with ease.
    + MongoDB: NoSQL database excels in versatility and effortlessly manages large data loads.
    + Bun: Bun is a JavaScript runtime that serves to be the replacement for Node.js


***************************

  1.  bun init -y
  2.  bun install express mongoose 
      bun install @types/express @types/mongoose typescript bun-types -d

  3.  package.json

        "scripts": {
          "dev": "bun --watch index.ts"
          "hot": "bun --hot index.ts"
        },

  - Bun supports two kinds of automatic reloading via CLI flags: 
    --watch mode, which hard restarts Bun's process when imported files change. 
    --hot mode, which soft reloads the code (without restarting the process) when imported files change.

  4. bun dev

*/

import express from 'express'

const app = express()

app.use(express.json())

app.get('/ping', (_, res) => {
  res.send('🏓 pong!')
})

app.listen(5000, () => {
  console.log('The magic happens on port 5000!')
})
