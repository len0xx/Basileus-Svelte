import { PostModel } from '../../../models/post'
import * as ERRORS from '../../../errors'
import type { Response } from 'express'
import type { ExtendedRequest } from '../../../types'

export async function get(req: ExtendedRequest, res: Response) {
	try {
		const author = req.query.author && req.query.author.toString()

		const query: { author?: string } = {}
		if (author) query.author = author

		const posts = await PostModel.find(query)
    
		res.json(posts)
	}
	catch (err) {
		console.error(err)
		res.json({
			ok: false,
			error: 'Unexpected error',
			errorCode: ERRORS.UNKNOWN_ERROR
		})
	}
}
