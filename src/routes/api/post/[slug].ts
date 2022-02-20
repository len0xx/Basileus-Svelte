import type { Request, Response } from 'express'
import { PostModel } from '../../../models/post'
import type { ExtendedRequest } from '../../../utilities'

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
				error: 'Post not found'
			})
		}
	}
	catch (err) {
		res.json({
			ok: false,
			error: 'Unexpected error'
		})
	}
}
