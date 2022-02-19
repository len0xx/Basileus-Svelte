import type { Request, Response } from 'express'

export async function get(req: Request, res: Response) {
    try {
        const token = req.cookies['token']

        if (token) {
            res.clearCookie('token')
            res.redirect('/')
        }
    }
    catch(err) {
        console.error(err)
        res.json({
            ok: false,
            error: 'Unexpected error'
        })
    }
}
