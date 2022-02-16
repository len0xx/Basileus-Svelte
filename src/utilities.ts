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
    if (text.length < 100) {
        return text
    }
    else {
        let words: string[] = text.split(' ')
        words.splice(30)
        const result: string = words.join(' ')
        return result + '...'
    }
}

export type RESTMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

export function transformFormData(form: FormData): any {
    let object: any = {}
    form.forEach((value, key) => object[key] = value)
    return object
}
