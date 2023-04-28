import { nanoid } from 'nanoid'
import { connection } from './connect.js'

// create new session with the given id
async function createSession (id) {
  const postgresInstance = connection()

  if (!postgresInstance) { // if can not connect to the database return undefined
    return undefined
  }

  const query = `
    INSERT INTO sessions (id)
    VALUES ('${id}')
    RETURNING id
  `

  const sessionID = await postgresInstance.query(query)
    .then(res => {
      console.log(res.rows[0])
      return res.rows[0].id // return the session id
    })
    .catch((err) => {
      console.error('An error ocurred while getting a session.', err)
      return undefined // internal server error
    })

  return sessionID
}

// iterCounter is a counter to limit the iterations
// of the recursive function
export async function generateSessionId (iterCounter) {
  const sessionId = nanoid()
  // get the session with the current session id
  // if exists
  const sessionExists = await getSession(sessionId)

  if (sessionExists) {
    if (iterCounter > 2) {
      return // break recursivity on the 4th iteration
    }

    return generateSessionId(iterCounter++) // try to generate session id again
  }

  // create the session to the sessions table
  const validSessionId = await createSession(sessionId)
  return validSessionId
}

export async function getSession (sessionId) {
  const postgresInstance = connection()

  if (!postgresInstance) { // if can not connect to the database return undefined
    return undefined
  }

  const query = `
    SELECT * 
    FROM sessions
    WHERE id = '${sessionId}'
  `

  const session = await postgresInstance.query(query)
    .then(res => {
      console.log(res.rows)
      return res.rows[0] || null // return the match sessionID or null if it's free
    })
    .catch((err) => {
      console.err('An error ocurred while getting a session.', err)
      return undefined // internal server error
    })

  return session
}

export async function removeSession (sessionID) {
  const postgresInstance = connection()

  if (!postgresInstance) { // if can not connect to the database return undefined
    return undefined
  }

  const query = `
    DELETE FROM sessions
    WHERE id = '${sessionID}'
    RETURNING *
  `

  const removedSession = await postgresInstance.query(query)
    .then(res => {
      // return the removed session or null if there was no session with
      // that id
      return res.rows[0] || null
    })
    .catch((err) => {
      console.err('An error ocurred while getting a session.', err)
      return undefined // internal server error
    })

  return removeSession
}
