import { PostModel } from '../models/post'
import type { Response } from 'express'
import type { ExtendedRequest } from '../utilities'

export async function get(req: ExtendedRequest, res: Response) {
	try {
		const posts = await PostModel.find({})
    
		res.json(posts)
	}
	catch (err) {
		console.error(err)
		res.json({
			message: 'Unexpected error'
		})
	}
}