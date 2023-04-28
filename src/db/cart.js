import { getSession } from './session.js'

export const getCart = async (sessionID) => {
  // we use getSessionMethod to get the session
  // and we return only the
  const session = await getSession(sessionID)
  return session
}
