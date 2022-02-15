import sirv from 'sirv'
import compression from 'compression'
import * as sapper from '@sapper/server'
// import fs from 'fs'
// import path from 'path'

import mongoose from 'mongoose'
import express from 'express'

const { PORT, NODE_ENV } = process.env
const dev = NODE_ENV === 'development'

require('dotenv').config()

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('DB connection is opened'))

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(compression({ threshold: 0 }))
app.use(sirv('static', { dev }))
app.use(sapper.middleware())

app.listen(PORT, () => console.log('Server runs on port ' + PORT))