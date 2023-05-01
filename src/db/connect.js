import Postgres from 'pg'

export function connection () {
  const postgresClient = new Postgres.Client({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
  })

  postgresClient.connect()
    .catch(() => {
      console.log('Can not connect to the postgres instance')
      return null
    })

  return postgresClient
}
