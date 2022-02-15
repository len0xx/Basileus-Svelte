import Post from '../models/post'
import type { Request, Response } from 'express'
import { formatSlug } from '../utilities'

export async function post(req: Request, res: Response) {
    try {
        const title: string = req.body.title
        const slug: string = formatSlug(title)

        const post = new Post({
            title: title,
            slug: slug,
            text: req.body.text
        })

        await post.save()
        res.redirect(`post/${slug}`)
    }
    catch (err) {
        console.error(err)
        res.redirect(`new?error`)
    }
}