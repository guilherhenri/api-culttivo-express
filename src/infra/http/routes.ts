import express from 'express'
import { getCreditRequest } from './controllers/get-credit-request'
import { createCreditRequest } from './controllers/create-credit-request'

export const router = express.Router()

router.get('/credit-requests/:id', getCreditRequest)
router.post('/credit-requests', createCreditRequest)