import { PostModel } from '../models/post'
import type { Response } from 'express'
import { formatSlug } from '../utilities'
import type { ExtendedRequest } from '../utilities'
import * as ERRORS from '../errors'

export async function post(req: ExtendedRequest, res: Response) {
	try {
		const title: string = req.body.title
		const text: string = req.body.text
		const slug: string = formatSlug(title)

		if (!text || !title) {
			res.json({
				ok: false,
				error: ERRORS.EMPTY_FIELDS
			})
			return
		}

		const post = new PostModel({
			title: title,
			slug: slug,
			text: text
		})

		await post.save()
        
		res.json({
			ok: true,
			message: 'Successfully created a new post'
		})
	}
	catch (err) {
		console.error(err)

		res.json({
			ok: false,
			message: 'Unknown error occurred'
		})
	}
}