import express from 'express'
import * as Dotenv from 'dotenv'
import { authRouter } from './routes/login.js'

Dotenv.config() // set all process.env variables
const app = express()

app.use(express.json()) // json the request bodies

app.get('/', (req, res) => {
  res.json({ status: 'server alive' })
})

app.use('/login', authRouter)

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})
