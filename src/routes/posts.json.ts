import Post from '../models/post'
import type { Request, Response } from 'express'

export async function get(req: Request, res: Response) {
    try {
        const posts = await Post.find({})
    
        res.json(posts)
    }
    catch (err) {
        console.error(err)
        res.json({
            message: 'Unexpected error'
        })
    }
}