import { Router } from 'express'
import { getUser } from '../db/connect.js'
import { comparePasswords } from '../crypto/passwords.js'

export const authRouter = Router()

authRouter.get('/', async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    res.status(400)
    return res.json({ 400: 'Bad request' })
  }

  const user = await getUser(username)

  // 500 Can't connect to the db
  if (user === undefined) {
    return res.json({ 500: 'Internal server error' })
  }

  // 400 user does not exist
  if (user === null) {
    return res.json({ 400: 'Bad request. User does not exists' })
  }

  await comparePasswords(password, user.password)

  // if the user types bad password
  if (!await comparePasswords(password, user.password)) {
    res.status(401)
    return res.json({ 401: 'Unauthorized. Bad password' })
  }

  // send the session cookie

  res.json({ user })
})
