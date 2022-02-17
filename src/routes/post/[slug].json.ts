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

export async function del(req: Request, res: Response) {
    try {
        const slug = req.params.slug

        const post = await Post.findOne({ slug: slug })
        
        if (post) {
            await Post.deleteOne({ slug: slug })

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
