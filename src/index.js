import express from 'express'
import * as Dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { authRouter } from './routes/auth.js'
import { productsRouter } from './routes/products.js'

Dotenv.config() // set all process.env variables
const app = express()

app.use(cookieParser())
app.use(express.json()) // json the request bodies

app.get('/', (req, res) => {
  res.json({ status: 'server alive' })
})

app.use('/', authRouter)
app.use('/products', productsRouter)

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})
