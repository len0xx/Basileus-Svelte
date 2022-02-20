import { PostModel } from '../../../models/post'
import { UserRole } from '../../../models/user'
import * as ERRORS from '../../../errors'
import type { Response } from 'express'
import type { ExtendedRequest } from '../../../types'

export async function get(req: ExtendedRequest, res: Response) {
	try {
		const slug = req.params.slug

		const post = await PostModel.findOne({ slug: slug })
    
		res.json(post)
	}
	catch (err) {
		console.error(err)

		res.json({
			message: 'Not found'
		})
	}
}

export async function del(req: ExtendedRequest, res: Response) {
	try {
		if (!req.user || req.user.role != UserRole.ADMIN) {
			res.json({
				ok: false,
				error: 'You have no permission to perform this action',
				errorCode: ERRORS.NO_PERMISSION
			})
			return
		}
        
		const slug = req.params.slug

		const post = await PostModel.findOne({ slug: slug })
        
		if (post) {
			await PostModel.deleteOne({ slug: slug })

			res.json({
				ok: true,
				message: 'Post deleted'
			})
		}
		else {
			res.json({
				ok: false,
				error: 'Post not found',
				errorCode: ERRORS.NOT_FOUND
			})
		}
	}
	catch (err) {
		res.json({
			ok: false,
			error: 'Unexpected error',
			errorCode: ERRORS.UNKNOWN_ERROR
		})
	}
}
