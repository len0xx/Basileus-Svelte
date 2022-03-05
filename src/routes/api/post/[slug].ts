import { PostModel } from '../../../models/post'
import { UserRole } from '../../../models/user'
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

        const slug = req.params.slug

        const post = await PostModel.findOne({ slug: slug })
    
        res.json(post)
    }
    catch (err) {
        console.error(err)

        res.json({
            ok: false,
            error: 'Not found',
            errorCode: ERRORS.NOT_FOUND
        })
    }
}

export async function del(req: ExtendedRequest, res: Response) {
    try {
        if (!req.body.csrf || !isCSRFValid(req.body.csrf.toString(), req)) {
            res.json({
                ok: false,
                error: 'Invalid token',
                errorCode: ERRORS.INVALID_CSRF
            })
            return
        }

        if (!req.user || req.user.role != UserRole.ADMIN) {
            res.json({
                ok: false,
                error: 'You have no permission to perform this action',
                errorCode: ERRORS.NO_PERMISSION
            })
            return
        }
        
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
                error: 'Post not found',
                errorCode: ERRORS.NOT_FOUND
            })
        }
    }
    catch (err) {
        res.json({
            ok: false,
            error: 'Unexpected error',
            errorCode: ERRORS.UNKNOWN_ERROR
        })
    }
}
