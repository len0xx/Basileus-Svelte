import type { Request, Response } from 'express'
import { UserModel, getPublicUserModel } from '../../models/user'
import type { ExtendedRequest } from '../../utilities'

export async function get(req: ExtendedRequest, res: Response) {
	try {
		const id = req.params.id

		const profileObject = await UserModel.findOne({ _id: id })

		const profile = getPublicUserModel(profileObject)
    
		res.json(profile)
	}
	catch (err) {
		console.error(err)

		res.json({
			ok: false,
			message: 'Not found'
		})
	}
}
