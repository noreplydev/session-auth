import { addProduct, getCart } from '../db/cart.js'
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
  res.json({ products: cartProducts.cart || [] }) // return the cart or empty array
}

export const add = async (req, res) => {
  const { sessionID } = req.cookies
  const { productID } = req.body

  if (!sessionID) {
    return _400(req, 'SessionID not found.')
  }

  if (!productID) {
    return _400(req, 'ProductID not found.')
  }

  const udpatedCart = await addProduct(sessionID, productID)
}

export const remove = async (req, res) => {

}
