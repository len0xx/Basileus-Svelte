import jwt from 'jsonwebtoken'
import { getPublicUserModel, UserModel } from './models/user'
import * as sapper from '@sapper/server'
import type { User } from './models/user'
import type { Response, NextFunction } from 'express'
import type { ExtendedRequest } from './types'

// For some reason storing this function in a separate file makes the client build much heavier
export default async function authorize(req: ExtendedRequest, res: Response, next: NextFunction): Promise<void> {
	jwt.verify(req.cookies['token'], process.env.SECRET, async function (err: any, decode: any) {
		let user: User | undefined = undefined

		if (!err) {
			try {
				const userObj = await UserModel.findOne({ _id: decode.id })

				req.user = user = getPublicUserModel(userObj)
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
}
