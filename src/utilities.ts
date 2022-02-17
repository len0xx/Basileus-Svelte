import jquery from 'jquery'

export function formatSlug(input: string): string {
    const date = new Date()
    let tokens = input.trim()
        .toLocaleLowerCase()
        .replace(/([^a-z0-9 ])/g, '')
        .replace(/  /g, ' ')
        .trim()
        .split(' ')
    
    tokens.splice(8)
    tokens.push(
        date.getDate().toString(),
        date.getMonth().toString(),
        date.getFullYear().toString()
    )

    return tokens.join('-')
}

export function cutPostText(text: string): string {
    const maxTextLength = 100
    const maxWordsLength = 30

    if (text.length < maxTextLength) {
        return text
    }
    else {
        let words: string[] = text.split(' ')
        words.splice(maxWordsLength)
        const result: string = words.join(' ')
        return result + '...'
    }
}

export type RESTMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

export function transformFormData(form: FormData): any {
    let object: any = {}
    form.forEach((value, key) => object[key] = value)
    return object
}

export type DefaultAJAXResponse = {
    ok: boolean,
    response?: any,
    message: string,
    error?: string
}

export function sendAJAXRequest(
    url: string,
    method: RESTMethod,
    data: FormData,
    callbackSuccess?: (res: DefaultAJAXResponse) => void,
    callbackError?: (res: string) => void
): void {
    const request = jquery.ajax({
        url: url,
        contentType: 'application/x-www-form-urlencoded',
        type: method,
        data: transformFormData(data),
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
