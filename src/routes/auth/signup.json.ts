import { UserModel } from '../../models/user'
import bcrypt from 'bcrypt'
import type { Request, Response } from 'express'

export async function post(req: Request, res: Response) {
	try {
		const user = new UserModel({
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			email: req.body.email,
			password: bcrypt.hashSync(req.body.password, 8)
		})
        
		user.save((err: any) => {
			if (err) {
				res.status(401).json({
					ok: false,
					error: 'User wasn\'t created'
				})
			} else {
				res.json({
					ok: true,
					message: 'Created successfully'
				})
			}
		})
	}
	catch(err) {
		console.error(err)
		res.status(500).json({
			ok: false,
			error: 'Unexpected error'
		})
	}
}
