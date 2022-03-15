import { ajax } from 'jquery'
import superagent from 'superagent'
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

export function stripTags(str: string): string {
    return str.replace(/<br>/gi, '\n')
        // .replace(/<\/p>/gi, '\n')
        .replace(/<(?:.|\s)*?>/g, '')
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

function responseCallback(
    res: any,
    callbackSuccess?: (res: any) => void,
    callbackError?: (res: any) => void
) {
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
}

// Функция для отправки AJAX запросов с клиента
export function sendWindowAJAX(
    url: string,
    method: RESTMethod,
    data?: FormData | Record<string, any> | null,
    callbackSuccess?: (res: DefaultAJAXResponse) => void,
    callbackError?: (res: string) => void,
    csrfToken?: string,
    headers?: JQuery.PlainObject<string> | null
): void {
    let finalData: Record<string, unknown> = {}

    if (data instanceof FormData) {
        finalData = transformFormData(data)
    }
    else if (data) {
        finalData = data
    }
    
    if (csrfToken) finalData.csrf = csrfToken

    const _headers = headers || {}

    let contentType = 'application/x-www-form-urlencoded'
    if (Object.keys(_headers).includes('Content-Type')) contentType = _headers['Content-Type']

    const request = ajax({
        url,
        contentType,
        headers: _headers,
        type: method,
        data: finalData,
        dataType: 'json',
    })

    request.done((res: any) => responseCallback(res, callbackSuccess, callbackError))

    request.fail((jqXHR, res) => {
        if (callbackError) callbackError(res)
        console.error(res)
    })
}

// Функция для отправки AJAX запросов с сервера
export async function sendNodeAJAX(
    url: string,
    method: RESTMethod,
    data?: Record<string, any>,
    headers?: Record<string, any>
): Promise<Record<string, any>> {
    let response: any
    if (!headers) headers = {}

    if (method == 'GET') response = await superagent.get(url).query(data).set(headers || {})
    else if (method == 'POST') response = await superagent.post(url).send(data).set(headers || {})
    else if (method == 'PUT') response = await superagent.put(url).send(data).set(headers || {})
    else if (method == 'PATCH') response = await superagent.patch(url).send(data).set(headers || {})
    else if (method == 'DELETE') response = await superagent.del(url).send(data).set(headers || {})

    return JSON.parse(response.text)
}

export function uploadFileAJAX(
    url: string,
    method: RESTMethod,
    data: FormData,
    callbackSuccess?: (res: DefaultAJAXResponse) => void,
    callbackError?: (res: string) => void
): void {
    const request = ajax({
        url,
        contentType: false,
        processData: false,
        type: method,
        data: data,
        dataType: 'json',
    })

    request.done((res: any) => responseCallback(res, callbackSuccess, callbackError))

    request.fail((jqXHR, res) => {
        if (callbackError) callbackError(res)
        console.error(res)
    })
}

const redirectDelay = 500
export const redirect = (location: string) => setTimeout(() => { window.location.href = location }, redirectDelay)

const doubleDigit = (num: number): string => num < 10 ? `0${num}` : num.toString()

export const formatDate = (date: Date): string => `${doubleDigit(date.getDate())}.${doubleDigit(date.getMonth() + 1)}.${date.getFullYear()}`

export function encodeQuery(data: Record<string, any>): string {
    delete data['page']
    const ret = []
    for (const d in data) {
        if (data[d] && data[d] !== '')
            ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]))
    }
    return ret.join('&')
}
