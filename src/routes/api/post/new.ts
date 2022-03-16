import { PostModel } from '../../../models/post'
import { formatSlug } from '../../../utilities'
import ERRORS from '../../../errors'
import { UserRole } from '../../../models/user'
import { isCSRFValid } from '../../../backendUtilities'
import { generateHTML } from '@tiptap/html'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import type { Response } from 'express'
import type { ExtendedRequest } from '../../../types'
import type { JSONContent } from '@tiptap/core'

export async function post(req: ExtendedRequest, res: Response) {
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
                error: 'You have no permission to create a post',
                errorCode: ERRORS.NO_PERMISSION
            })
            return
        }

        const title: string = req.body.title
        const text: string = req.body.text
        const slug: string = formatSlug(title)

        if (!text || !title) {
            res.json({
                ok: false,
                error: 'Please fill in all the required fields',
                errorCode: ERRORS.EMPTY_FIELDS
            })
            return
        }

        let textHTML = ''
        try {
            textHTML = generateHTML(JSON.parse(text) as JSONContent, [
                StarterKit,
                Underline,
                Link,
                Image
            ])
        }
        catch(error) {
            console.error(error)

            res.json({
                ok: false,
                errorCode: ERRORS.INVALID_POST_TEXT,
                error: 'Invalid post text'
            })
            return
        }

        const post = new PostModel({
            title,
            slug,
            text: textHTML,
            author: req.user.id
        })

        await post.save()
        
        res.json({
            ok: true,
            slug: slug,
            message: 'Successfully created a new post'
        })
    }
    catch (err) {
        console.error(err)

        res.json({
            ok: false,
            errorCode: ERRORS.UNKNOWN_ERROR,
            error: 'Unknown error occurred'
        })
    }
}
