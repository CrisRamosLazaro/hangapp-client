export type ErrorMessages = {
    [key: string]: string
}

export type ErrorMessageProps = {
    message: string | undefined
}

export interface ErrorResponseData {
    field: string
    message: string
}