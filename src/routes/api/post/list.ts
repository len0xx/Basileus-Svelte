import { PostModel } from '../../../models/post'
import ERRORS from '../../../errors'
import { isCSRFValid } from '../../../backendUtilities'
import type { Response } from 'express'
import type { ExtendedRequest } from '../../../types'

export async function get(req: ExtendedRequest, res: Response) {
    try {
        if (!req.query.csrf || !isCSRFValid(req.query.csrf.toString(), req)) {
            res.json({
                ok: false,
                error: 'Invalid token',
                errorCode: ERRORS.INVALID_CSRF
            })
            return
        }

        const perPage = 10
        const author = req.query.author && req.query.author.toString()
        const search = req.query.s && req.query.s.toString()
        const page = req.query.page && +req.query.page || 1
        const offset = perPage * (page - 1)

        const query: {
            author?: string,
            title?: RegExp
        } = {}
        if (author) query.author = author
        if (search) query.title = new RegExp(search, 'i')

        const posts = await PostModel.find(query).skip(offset).limit(perPage).sort({ created: -1 })
        const postsAmount = await PostModel.count(query)
        const pages = Math.ceil(postsAmount / perPage)
    
        res.json({
            posts,
            pages
        })
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
