import { UserModel } from '../../models/user'
import type { UserObject } from '../../models/user'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import type { Request, Response } from 'express'

export async function get(req: Request, res: Response) {
    try {
        const user: UserObject | undefined = await UserModel.findOne({
            email: req.query.email
        })

        if (!user) {
            res.status(404).json({
                ok: false,
                error: 'Not found'
            })
        }

        const passwordIsValid = bcrypt.compareSync(
            req.query.password.toString(),
            user.password
        )

        if (!passwordIsValid) {
            res.status(401).json({
                ok: false,
                error: 'Invalid password'
            })
        }

        const token = jwt.sign({
            id: user._id
        }, process.env.SECRET, {
            expiresIn: 86400
        })

        res.cookie('token', token, { maxAge: 86400, httpOnly: true })
        res.json({
            ok: true,
            accessToken: token
        })
    }
    catch(err) {
        console.error(err)
        res.json({
            ok: false,
            error: 'Unexpected error'
        })
    }
}
