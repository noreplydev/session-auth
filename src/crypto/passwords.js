import bcrypt from 'bcrypt'

export async function comparePasswords (password, hash) {
  const match = await bcrypt.compare(password, hash)
  console.log(match)
}

export async function hashPassword (password) {
  const saltRounds = 10

  const hash = await bcrypt.genSalt(saltRounds)
    .then(async (salt) => {
      return await bcrypt.hash(password, salt)
        .then(hash => hash)
        .catch((err) => {
          console.err('Error generating password hash', err)
          return null
        })
    })
    .catch(err => {
      console.error('Error generating salt for the hashing', err)
      return null
    })

  return hash
}
