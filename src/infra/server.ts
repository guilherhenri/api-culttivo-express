import './workers/bullmq-worker'

import { app } from "./app"

app.listen(3333, (error) => {
  if (error) {
    console.log('Error when launching!')
    process.exit(1)
  }

  console.log('HTTP Server Running on: http://localhost:3333')
})