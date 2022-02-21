import { UserModel, getPublicUserModel } from '../../../models/user'
import * as ERRORS from '../../../errors'
import type { Response } from 'express'
import type { ExtendedRequest } from '../../../types'

export async function get(req: ExtendedRequest, res: Response) {
	try {
		const id = req.params.id

		const userObject = await UserModel.findOne({ _id: id })

		const user = getPublicUserModel(userObject)
    
		res.json({
			ok: true,
			user: user
		})
	}
	catch (err) {
		console.error(err)

		res.json({
			ok: false,
			error: 'Not found',
			errorCode: ERRORS.NOT_FOUND
		})
	}
}

export async function put(req: ExtendedRequest, res: Response) {
	try {
		const id = req.params.id

		const user = req.user
		if (!user) {
			res.json({
				ok: false,
				error: 'You have no permission to perform this action since you are unauthorized',
				errorCode: ERRORS.UNAUTHORIZED
			})
			return
		}

		const updatedModel = {
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			email: req.body.email,
			age: +req.body.age
		}

		await UserModel.updateOne({ _id: id }, updatedModel)
    
		res.json({
			ok: true
		})
	}
	catch (err) {
		console.error(err)

		res.json({
			ok: false,
			error: 'Unknown error',
			errorCode: ERRORS.UNKNOWN_ERROR
		})
	}
}
