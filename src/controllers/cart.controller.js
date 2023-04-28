import { getCart } from '../db/cart.js'
import { _400, _500 } from '../lib/httpError.js'

export const get = async (req, res) => {
  const { sessionID } = req.cookies

  if (!sessionID) {
    return _400(req, 'SessionID not found.')
  }

  const cartProducts = await getCart(sessionID)

  if (cartProducts === undefined) {
    return _500(res)
  }

  if (cartProducts === null) {
    return _400(res, 'Unknown sessionID')
  }

  delete cartProducts.id
  res.status(200)
  res.json({ products: cartProducts })
}

export const add = async (req, res) => {

}

export const remove = async (req, res) => {

}
