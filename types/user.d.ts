export interface UserAuthData {
    id: string
    name: string
    email: string
}

export interface LoginData {
    email: string
    password: string
    [key: string]: string
}

export interface SignupData {
    name: string
    email: string
    password: string
    lastName: string,
    avatar: string,
    [key: string]: string

}