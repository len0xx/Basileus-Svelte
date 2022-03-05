import sirv from 'sirv'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import express from 'express'
import authorize from './middlewares/auth'
import csrfTokenMiddleware from './middlewares/csrfToken'

dotenv.config()

const { APP_PORT, APP_IP, NODE_ENV, DB_CONNECTION_STRING } = process.env
const dev = NODE_ENV === 'development'

mongoose.connect(DB_CONNECTION_STRING)
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('DB connected'))

const app = express()

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(compression({ threshold: 0 }))
app.use(sirv('static', { dev }))
app.use(csrfTokenMiddleware)
app.use(authorize)

app.listen(+APP_PORT, APP_IP, () => console.log('Server runs on ' + APP_IP + ':' + APP_PORT))
