import { listProducts } from '../db/products.js'
import { _500 } from '../lib/httpError.js'

// get all the products list
export const list = async (req, res) => {
  const data = await listProducts()

  if (data === undefined) {
    return _500(res)
  }

  res.status(200)
  res.json({ data })
}
