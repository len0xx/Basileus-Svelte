import type { Response } from 'express'
import type { ExtendedRequest } from '../../types'

export async function get(req: ExtendedRequest, res: Response) {
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
