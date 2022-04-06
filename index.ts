import express from 'express'
import { config } from 'dotenv'

config()

import graphQlServer from './server'

const port = process.env.PORT!

const app = express()
app.use(express.json())

graphQlServer(app, port).catch((err) =>
  process.env.NODE_ENV === 'production'
    ? console.log('SERVER ERROR', err.message ?? 'An Error occured')
    : console.log('SERVER ERROR', err)
)

export default app
