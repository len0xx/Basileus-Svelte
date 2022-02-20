import { PostModel } from '../../../models/post'
import { formatSlug } from '../../../utilities'
import * as ERRORS from '../../../errors'
import type { Response } from 'express'
import type { ExtendedRequest } from '../../../types'

export async function post(req: ExtendedRequest, res: Response) {
	try {
		if (!req.user) {
			res.json({
				ok: false,
				error: 'You need to authorize first',
				errorCode: ERRORS.UNAUTHORIZED
			})
			return
		}

		const title: string = req.body.title
		const text: string = req.body.text
		const slug: string = formatSlug(title)

		if (!text || !title) {
			res.json({
				ok: false,
				error: 'Please fill in all the required fields',
				errorCode: ERRORS.EMPTY_FIELDS
			})
			return
		}

		const post = new PostModel({
			title: title,
			slug: slug,
			text: text,
			author: req.user.id
		})

		await post.save()
        
		res.json({
			ok: true,
			slug: slug,
			message: 'Successfully created a new post'
		})
	}
	catch (err) {
		console.error(err)

		res.json({
			ok: false,
			errorCode: ERRORS.UNKNOWN_ERROR,
			error: 'Unknown error occurred'
		})
	}
}
