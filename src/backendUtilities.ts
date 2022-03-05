import crypto from 'crypto'
import { CSRF_SALT } from './config'
import type { ExtendedRequest } from './types'

export const createCSRF = () => {
    const secret = crypto.randomBytes(16).toString('hex')
    const token = crypto.createHash('sha256').update(secret + ':' + CSRF_SALT).digest('hex')

    return token
}

export const isCSRFValid = (token: string, req: ExtendedRequest) => token == req.csrfToken
