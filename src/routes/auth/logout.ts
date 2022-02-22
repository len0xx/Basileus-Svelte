import ERRORS from '../../errors'
import type { Response } from 'express'
import type { ExtendedRequest } from '../../types'

export async function get(req: ExtendedRequest, res: Response) {
	try {
		res.clearCookie('token')
		res.redirect('/')
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
