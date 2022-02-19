import { UserModel } from '../../models/user'
import type { UserObject } from '../../models/user'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import type { Request, Response } from 'express'

export async function get(req: Request, res: Response) {
	try {
		const user: UserObject | undefined = await UserModel.findOne({
			email: req.query.email
		})

		if (!user) {
			res.json({
				ok: false,
				error: 'The user with such email doesn\'t exist'
			})
			return
		}

		const passwordIsValid = bcrypt.compareSync(
			req.query.password.toString(),
			user.password
		)

		if (!passwordIsValid) {
			res.json({
				ok: false,
				error: 'Invalid password'
			})
			return
		}

		const token = jwt.sign({
			id: user._id
		}, process.env.SECRET, {
			expiresIn: 86400 * 30
		})

		res.cookie('token', token, { maxAge: 86400 * 1000 * 30, httpOnly: true })
		res.json({
			ok: true,
			accessToken: token
		})
	}
	catch(err) {
		console.error(err)
		res.json({
			ok: false,
			error: 'Unexpected error'
		})
	}
}
