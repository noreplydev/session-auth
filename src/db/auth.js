import { connection } from './connect.js'

// CREATE A USER
export async function createUser ({ username, name, description, hash }) {
  const postgresInstance = connection()

  if (!postgresInstance) { // if can not connect to the database return undefined
    return undefined
  }

  const query = `
    INSERT INTO users (username, name, description, password)
    VALUES ('${username}', '${name}', '${description}', '${hash}')
    RETURNING *
  `

  const user = await postgresInstance.query(query)
    .then((res) => {
      return res.rows[0] // return the user or null
    })
    .catch((err) => {
      console.error('An error ocurred while searching for a user.', err)
      return undefined // internal server error
    })

  return user
}

// GET A USER BY IT'S USERNAME
export async function getUser (username) {
  const postgresInstance = connection()

  if (!postgresInstance) { // if can not connect to the database return undefined
    return undefined
  }

  const query = `
    SELECT * 
    FROM users 
    WHERE username = '${username}'
  `

  const user = await postgresInstance.query(query)
    .then((res) => {
      return res.rows[0] || null // return the user or null
    })
    .catch((err) => {
      console.error('An error ocurred while searching for a user.', err)
      return undefined // internal server error
    })

  return user
}
