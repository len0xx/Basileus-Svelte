import { UserModel, getPublicUserModel } from '../../models/user'
import type { UserObject } from '../../models/user'
import jwt from 'jsonwebtoken'
import type { Request, Response } from 'express'

export async function get(req: Request, res: Response) {
	// console.log(req.headers)

	if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {

		jwt.verify(req.headers.authorization.split(' ')[1], process.env.SECRET, async function (err: any, decode: any) {
			if (err) {
				res.status(403).json({
					ok: false,
					error: 'Invalid token'
				})
				return
			}

			const userObj: UserObject = await UserModel.findOne({
				_id: decode.id
			})

			const user = getPublicUserModel(userObj)

			if (user) {
				res.json({
					ok: true,
					user: user
				})
			}
			else {
				res.status(500).json({
					ok: false,
					error: 'Not found'
				})
			}
		})
	}
	else {
		res.status(500).json({
			ok: false,
			error: 'Unexpected error'
		})
	}
}
