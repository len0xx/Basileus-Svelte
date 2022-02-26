import sirv from 'sirv'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import express from 'express'
import authorize from './authMiddleware'

const { PORT, NODE_ENV } = process.env
const dev = NODE_ENV === 'development'

dotenv.config()

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('DB connected'))

const app = express()

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(compression({ threshold: 0 }))
app.use(sirv('static', { dev }))
app.use(authorize)

app.listen(PORT, () => console.log('Server runs on port ' + PORT))
