import { Router } from 'express'
import { _400 } from '../lib/httpError.js'
import { connection } from '../db/connect.js'

export const productsRouter = Router()

productsRouter.get('/', async (req, res) => {

})
