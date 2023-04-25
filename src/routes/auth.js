import { Router } from 'express'
import { createUser, getUser } from '../db/connect.js'
import { comparePasswords, hashPassword } from '../crypto/passwords.js'

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

  await comparePasswords(password, user.password)

  // if the user types bad password
  if (!await comparePasswords(password, user.password)) {
    res.status(401)
    return res.json({ 401: 'Unauthorized. Bad password' })
  }

  // send the session cookie

  res.json({ user })
})

authRouter.post('/register', async (req, res) => {
  const { username, name, description, password } = req.body

  if (!username || !name || !description || !password) {
    res.status(401)
    return res.json({ 401: 'Bad request. Required field are empty' })
  }

  // password hashing
  const hash = await hashPassword(password)

  if (!hash) {
    res.status(500)
    res.json({ 500: 'Internal server error' })
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

  const user = await createUser({ username, name, description, hash })

  // 500 Can't connect to the db
  if (user === undefined) {
    return res.json({ 500: 'Internal server error' })
  }

  res.status(201)
  res.json({ 201: 'New user created successfully' })
})
