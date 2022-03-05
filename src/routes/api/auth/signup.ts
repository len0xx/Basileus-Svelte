import { UserModel } from '../../../models/user'
import bcrypt from 'bcrypt'
import ERRORS from '../../../errors'
import { isCSRFValid } from '../../../backendUtilities'
import type { Response } from 'express'
import type { ExtendedRequest } from '../../../types'

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

        const user = new UserModel({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8)
        })
        
        user.save((err: any) => {
            if (err) {
                res.json({
                    ok: false,
                    error: 'Error',
                    errorCode: ERRORS.UNKNOWN_ERROR
                })
            } else {
                res.json({
                    ok: true,
                    message: 'Created successfully'
                })
            }
        })
    }
    catch(err) {
        console.error(err)
        res.json({
            ok: false,
            error: 'Unexpected error',
            errorCode: ERRORS.UNKNOWN_ERROR
        })
    }
}
