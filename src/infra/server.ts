import express from 'express'
import { router } from './http/routes'

import './workers/bullmq-worker'

export const app = express()

app.use(express.json())

app.use(router)

app.listen(3333, (error) => {
  if (error) {
    console.log('Error when launching!')
    process.exit(1)
  }

  console.log('HTTP Server Running on: http://localhost:3333')
})