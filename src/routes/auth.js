import { Router } from 'express'
import { createUser, getUser } from '../db/auth.js'
import { comparePasswords, hashPassword } from '../crypto/passwords.js'
import { generateSessionId } from '../db/session.js'

export const authRouter = Router()

authRouter.post('/login', async (req, res) => {
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

  // if the user types bad password
  if (!await comparePasswords(password, user.password)) {
    res.status(401)
    return res.json({ 401: 'Unauthorized. Bad password' })
  }

  // generate the session cookie
  const sessionID = await generateSessionId(0)

  // 500 Can't connect to the db
  if (sessionID === undefined) {
    return res.json({ 500: 'Internal server error' })
  }

  // return the session cookie
  res.cookie('sessionID', sessionID)
  res.json({ 200: 'OK' })
})

authRouter.post('/register', async (req, res) => {
  const { username, name, description, password } = req.body

  if (!username || !name || !description || !password) {
    res.status(401)
    return res.json({ 401: 'Bad request. Required fields are empty' })
  }

  // check if the username already exists
  const userExists = await getUser(username)

  // 500 Can't connect to the db
  if (userExists === undefined) {
    res.status(500)
    return res.json({ 500: 'Internal server error' })
  }

  // if not null username exists and create new user is not possible
  if (userExists) {
    res.status(400)
    return res.json({ 400: 'Bad request. Username Already exists' })
  }

  // password hashing
  const hash = await hashPassword(password)

  if (!hash) {
    res.status(500)
    res.json({ 500: 'Internal server error' })
  }

  const user = await createUser({ username, name, description, hash })

  // 500 Can't connect to the db
  if (user === undefined) {
    return res.json({ 500: 'Internal server error' })
  }

  res.status(201)
  res.json({ 201: 'New user created successfully' })
})
