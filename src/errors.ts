export const UNKNOWN_ERROR = 1
export const EMPTY_FIELDS = 2
export const UNAUTHORIZED = 3

export const description = (err: number): string => {
	if (err === EMPTY_FIELDS) {
		return 'The required fields are empty'
	}
	else {
		return 'Unknown error'
	}
}