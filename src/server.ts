import sirv from 'sirv'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import * as sapper from '@sapper/server'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import express from 'express'
import jwt from 'jsonwebtoken'
import { UserModel, getPublicUserModel } from './models/user'
import type { User } from './models/user'
import type { Response, NextFunction } from 'express'
import type { ExtendedRequest } from './utilities'

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
app.use(async (req: ExtendedRequest, res: Response, next: NextFunction) => {
	jwt.verify(req.cookies['token'], process.env.SECRET, async function (err: any, decode: any) {
		let user: User | undefined = undefined

		if (!err) {
			try {
				const userObj = await UserModel.findOne({ _id: decode.id })

				user = getPublicUserModel(userObj)

				req.user = user
			}
			catch(err) {
				console.error(err)
			}
		}

		return sapper.middleware({
			session: () => {
				return {
					user: user,
					token: req.cookies['token']
				}
			}
		})(req, res, next)
	})
})

app.listen(PORT, () => console.log('Server runs on port ' + PORT))
