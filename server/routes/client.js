import express from 'express'
import { getProducts, getCustomers } from '../controllers/client'

const router = express.Router()

router.get('/products', getProducts)
router.get('/customers', getCustomers)

export default router
