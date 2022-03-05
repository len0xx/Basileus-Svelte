import { createCSRF } from '../backendUtilities'
import type { Response, NextFunction } from 'express'
import type { ExtendedRequest } from '../types'

export default function(req: ExtendedRequest, res: Response, next: NextFunction) {
    let token = ''
    if (!req.cookies['csrf']) {
        token = createCSRF()
        res.cookie('csrf', token, { path: '/', httpOnly: true })
    }
    else {
        token = req.cookies['csrf']
    }
    req.csrfToken = token
    next()
} 
