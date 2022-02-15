import type { Request, Response } from 'express'
import Post from '../../models/post'

export async function get(req: Request, res: Response) {
    try {
        const slug = req.params.slug

        const post = await Post.findOne({ slug: slug })
    
        res.json(post)
    }
    catch (err) {
        console.error(err)

        res.json({
            message: 'Not found'
        })
    }
}
