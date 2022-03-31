import express from 'express'
import cors from 'cors'

import loggerMiddleware from '../middlewares/logger.js'
import databaseMiddleware from '../middlewares/database.js'
import routes from '../routes/index.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(loggerMiddleware)
app.use(databaseMiddleware)
app.use(routes)

export default app
