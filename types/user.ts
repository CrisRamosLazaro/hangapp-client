export type Role = 'ADMIN' | 'ORGANIZER' | 'MEMBER'

export interface UserSignupData {
    name: string
    email: string
    password: string
    lastName: string
    avatar: string
    [key: string]: string
}

export interface LoginData {
    email: string
    password: string
    [key: string]: string
}

export interface User {
    _id: string
    email: string
    firstName: string
    lastName: string
    avatar: string
    role: Role
    faveSpots: string[]
    [key: string]: any
}