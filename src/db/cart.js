import { connection } from './connect.js'
import { getSession } from './session.js'

export const getCart = async (sessionID) => {
  // we use getSessionMethod to get the session
  // and we return only the
  const session = await getSession(sessionID)
  return session
}

export const addProduct = async (sessionID, productID) => {
  const postgresInstance = await connection()

  if (!postgresInstance) {
    return undefined
  }

  const query = `
    UPDATE sessions
    SET cart = ARRAY_APPEND(cart, '${productID}')
    WHERE id = '${sessionID}'
    RETURNING *
  `

  const updatedCart = await postgresInstance.query(query)
    .then(res => {
      return res.rows
    })
    .catch(err => {
      console.error(err)
      return undefined
    })

  return updatedCart
}
