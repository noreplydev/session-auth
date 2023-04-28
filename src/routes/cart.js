import { Router } from 'express'
import * as cartController from '../controllers/cart.controller.js'

export const cartRouter = Router()

cartRouter.get('/', cartController.get) // get all the cart
cartRouter.post('/', cartController.add) // get all the cart
cartRouter.delete('/', cartController.remove) // get all the cart
