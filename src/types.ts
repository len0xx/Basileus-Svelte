import type { User } from './models/user'
import type { Request } from 'express'

export interface Page {
    host: string,
    path: string,
    params?: Record<string, unknown>,
    query?: Record<string, unknown>
}

export interface Session {
    user?: User,
    csrfToken: string
}

export interface ExtendedRequest extends Request {
    user?: User,
    csrfToken: string
}

export type RESTMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

export interface DefaultAJAXResponse {
    ok: boolean,
    response?: Record<string, unknown>,
    message: string,
    error?: string
}
