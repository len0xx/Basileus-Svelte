import { UserRole } from '../../../models/user'
import ERRORS from '../../../errors'
import { upload } from '../../../multer'
import type { Response } from 'express'
import type { ExtendedRequest } from '../../../types'

export async function post(req: ExtendedRequest, res: Response) {
    try {
        if (!req.user || req.user.role != UserRole.ADMIN) {
            res.json({
                ok: false,
                error: 'You have no permission to perform this action',
                errorCode: ERRORS.NO_PERMISSION
            })
            return
        }
        
        upload.single("image")(req, res, function(err: any) {
            if (err) {
                res.json({
                    ok: false,
                    error: 'Unexpected error',
                    errorCode: ERRORS.UNKNOWN_ERROR
                })
                console.error(err)
            }
            else {
                res.json({
                    ok: true,
                    filename: req.file.filename
                })
            }
        })
    }
    catch (err) {
        res.json({
            ok: false,
            error: 'Unexpected error',
            errorCode: ERRORS.UNKNOWN_ERROR
        })
    }
}
