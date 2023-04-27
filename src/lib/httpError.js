export const _500 = (res) => {
  res.status(500)
  return res.json({ 500: 'Internal server error' })
}

export const _400 = (res, message = '') => {
  const mes = message ? ' ' + message : message
  res.status(400)
  return res.json({ 400: `Bad request.${mes}` })
}

export const _401 = (res, message = '') => {
  const mes = message ? ' ' + message : message
  res.status(401)
  return res.json({ 401: `Unauthorized.${mes}` })
}
