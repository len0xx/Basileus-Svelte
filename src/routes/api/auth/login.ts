import { UserModel } from '../../../models/user'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import ERRORS from '../../../errors'
import { isCSRFValid } from '../../../backendUtilities'
import type { Response } from 'express'
import type { ExtendedRequest } from '../../../types'
import type { UserObject } from '../../../models/user'

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

        const user: UserObject | undefined = await UserModel.findOne({
            email: req.query.email
        })

        if (!user) {
            res.json({
                ok: false,
                error: 'The user with such email doesn\'t exist',
                errorCode: ERRORS.NOT_FOUND
            })
            return
        }

        const passwordIsValid = bcrypt.compareSync(
            req.query.password.toString(),
            user.password
        )

        if (!passwordIsValid) {
            res.json({
                ok: false,
                error: 'Invalid password',
                errorCode: ERRORS.INVALID_DATA
            })
            return
        }

        const token = jwt.sign({
            id: user._id
        }, process.env.SECRET, {
            expiresIn: 86400 * 30
        })

        res.cookie('token', token, { maxAge: 86400 * 1000 * 30, path: '/', httpOnly: true })
        res.json({
            ok: true
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
