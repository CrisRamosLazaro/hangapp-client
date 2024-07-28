export interface UserAuthData {
    _id: string
    name: string
    email: string
    role: string
}

export interface LoginData {
    email: string
    password: string
    [key: string]: string
}

export interface UserSignupData {
    name: string
    email: string
    password: string
    lastName: string,
    avatar: string,
    [key: string]: string

}

export interface User {
    _id: string
    firstName: string
    lastName: string,
    avatar: string,
    [key: string]: string

}