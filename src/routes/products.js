import { Router } from 'express'
import * as productsController from '../controllers/products.controller.js'

export const productsRouter = Router()

// get all products
productsRouter.get('/', productsController.list)
