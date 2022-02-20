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
