import jwt from 'jsonwebtoken'
import { getPublicUserModel, UserModel } from '../models/user'
import * as sapper from '@sapper/server'
import type { User } from '../models/user'
import type { Response, NextFunction } from 'express'
import type { ExtendedRequest } from '../types'

// For some reason storing this function in a separate file makes the client build much heavier
export default async function authorize(req: ExtendedRequest, res: Response, next: NextFunction) {
    jwt.verify(req.cookies['token'], process.env.SECRET, async function (error: any, decode: any) {
        let user: User | undefined = undefined

        if (!error) {
            try {
                const userObj = await UserModel.findOne({ _id: decode.id })

                req.user = user = getPublicUserModel(userObj)
            }
            catch(err) {
                console.error(err)
            }
        }

        return sapper.middleware({
            session: () => {
                return {
                    user,
                    csrfToken: req.csrfToken
                }
            }
        })(req, res, next)
    })
}
