import Postgres from 'pg'

function connection () {
  const postgresClient = new Postgres.Client({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
  })

  postgresClient.connect()
    .then(() => {
      console.log('Successfully connected to postgres instance')
    })
    .catch(() => {
      console.log('Can not connect to the postgres instance')
      return null
    })

  return postgresClient
}

export function createUser () {
  // some user creation boilerplate
}

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
      console.log('An error ocurred while searching for a user.', err)
      return undefined // internal server error
    })

  return user
}
