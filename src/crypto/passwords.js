import bcrypt from 'bcrypt'

export async function comparePasswords (password, hash) {
  const match = await bcrypt.compare(password, hash)
  console.log(match)
}
