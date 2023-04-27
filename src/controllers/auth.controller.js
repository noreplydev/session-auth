import { createUser, getUser } from '../db/auth.js'
import { comparePasswords, hashPassword } from '../crypto/passwords.js'
import { generateSessionId, removeSession } from '../db/session.js'
import { _400, _401, _500 } from '../lib/httpError.js'

export const register = async (req, res) => {
  const { username, name, description, password } = req.body

  if (!username || !name || !description || !password) {
    res.status(401)
    return res.json({ 401: 'Bad request. Required fields are empty' })
  }

  // check if the username already exists
  const userExists = await getUser(username)

  // 500 Can't connect to the db
  if (userExists === undefined) {
    return _500(res)
  }

  // if not null username exists and create new user is not possible
  if (userExists) {
    return _400(res, 'Username already exists')
  }

  // password hashing
  const hash = await hashPassword(password)

  if (!hash) {
    return _500(res)
  }

  const user = await createUser({ username, name, description, hash })

  // 500 Can't connect to the db
  if (user === undefined) {
    return _500(res)
  }

  res.status(201)
  res.json({ 201: 'New user created successfully' })
}

export const login = async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return _400(res)
  }

  const user = await getUser(username)

  // 500 Can't connect to the db
  if (user === undefined) {
    return _500(res)
  }

  // 400 user does not exist
  if (user === null) {
    return _400(res, 'User does not exists')
  }

  // if the user types bad password
  if (!await comparePasswords(password, user.password)) {
    return _401(res, 'Bad password')
  }

  // generate the session cookie
  const sessionID = await generateSessionId(0)

  // 500 Can't connect to the db
  if (sessionID === undefined) {
    return _500(res)
  }

  // return the session cookie
  res.cookie('sessionID', sessionID)
  res.json({ 200: 'OK' })
}

export const logout = async (req, res) => {
  const { sessionID } = req.cookies

  // if sessionID is not present return bad request
  if (!sessionID) {
    return _400(res)
  }

  const removedSession = await removeSession(sessionID)

  if (removedSession === undefined) {
    return _500(res)
  }

  res.status(200)
  res.clearCookie('sessionID')
  res.json({ 200: 'OK. Logout succesfully' })
}
