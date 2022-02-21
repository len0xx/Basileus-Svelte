import { ajax } from 'jquery'
import type { RESTMethod, DefaultAJAXResponse } from './types'

// Create slug from the title
export function formatSlug(input: string): string {
	const date = new Date()
	const tokens = input.trim()
		.toLocaleLowerCase()
		.replace(/([^a-z0-9 ])/g, '')
		.replace(/ {2}/g, ' ')
		.trim()
		.split(' ')
    
	tokens.splice(8)
	tokens.push(
		date.getDate().toString(),
		(date.getMonth() + 1).toString(),
		date.getFullYear().toString()
	)

	return tokens.join('-')
}

// Cut the long text into short version
export function cutPostText(text: string): string {
	const maxTextLength = 100
	const maxWordsLength = 30

	if (text.length < maxTextLength) {
		return text
	}
	else {
		const words: string[] = text.split(' ')
		words.splice(maxWordsLength)
		const result: string = words.join(' ')
		return result + '...'
	}
}

// Create a plain JSON from FormData
export function transformFormData(form: FormData): Record<string, unknown> {
	const object: Record<string, unknown> = {}
	form.forEach((value, key) => object[key] = value)
	return object
}

export function sendAJAXRequest(
	url: string,
	method: RESTMethod,
	data?: FormData | null,
	headers?: JQuery.PlainObject<string> | null,
	callbackSuccess?: (res: DefaultAJAXResponse) => void,
	callbackError?: (res: string) => void
): void {
	const request = ajax({
		url: url,
		contentType: 'application/x-www-form-urlencoded',
		headers: headers || {},
		type: method,
		data: data ? transformFormData(data) : {},
		dataType: 'json'
	})

	request.done((res) => {
		if (res.ok) {
			if (callbackSuccess) callbackSuccess(res)
		}
		else {
			if (callbackError) callbackError(res)
			console.error(res)
		}
	})

	request.fail((jqXHR, res) => {
		if (callbackError) callbackError(res)
		console.error(res)
	})
}

export const redirect = (location: string) => setTimeout(() => { window.location.href = location }, 500)
