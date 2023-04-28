import { connection } from './connect.js'

export const listProducts = async (req, res) => {
  const postgresInstance = await connection()

  if (!postgresInstance) { // if can not connect to the database return undefined
    return undefined
  }

  const query = `
    SELECT *
    FROM products
  `

  const products = await postgresInstance.query(query)
    .then(res => {
      return res.rows
    })
    .catch(err => {
      console.error('An error ocurred trying to fetch all products: ', err)
      return undefined
    })

  return products
}
