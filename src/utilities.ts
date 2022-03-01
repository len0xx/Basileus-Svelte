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
    data?: FormData | Record<string, string> | null,
    headers?: JQuery.PlainObject<string> | null,
    callbackSuccess?: (res: DefaultAJAXResponse) => void,
    callbackError?: (res: string) => void
): void {
    let finalData: Record<string, unknown> = {}

    if (data instanceof FormData) {
        finalData = transformFormData(data)
    }
    else if (data) {
        finalData = data
    }

    const request = ajax({
        url: url,
        contentType: 'application/x-www-form-urlencoded',
        headers: headers || {},
        type: method,
        data: finalData,
        dataType: 'json'
    })

    request.done((res) => {
        if (res.ok === true) {
            if (callbackSuccess) callbackSuccess(res)
        }
        else if (res.ok === false) {
            if (callbackError) callbackError(res)
            console.error(res)
        }
        else {
            if (callbackSuccess) callbackSuccess(res)
        }
    })

    request.fail((jqXHR, res) => {
        if (callbackError) callbackError(res)
        console.error(res)
    })
}

const redirectDelay = 500
export const redirect = (location: string) => setTimeout(() => { window.location.href = location }, redirectDelay)

const doubleDigit = (num: number): string => num < 10 ? `0${num}` : num.toString()

export const formatDate = (date: Date): string => `${doubleDigit(date.getDate())}.${doubleDigit(date.getMonth() + 1)}.${date.getFullYear()}`
