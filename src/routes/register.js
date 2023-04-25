import { Router } from 'express'

export const authRouter = Router()

const users = []

authRouter.get('/', (req, res) => {
  const { username, password } = req.body
  res.json({ username, password })
})
