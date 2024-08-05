import authService from '@/services/auth.services'
import { Role } from 'types/user'
import { loginAndAuthenticateUserArgs } from 'types/login'
import { AxiosError } from 'axios'
import { ErrorResponseData } from 'types/errors'

export const getSignupRedirectPath = (role: Role) => {
    switch (role) {
        case 'MEMBER':
            return '/spots'
        case 'ORGANIZER':
            return '/spots'
        case 'ADMIN':
            return '/spots'
        default:
            return '/spots'
    }
}

export const getLoginRedirectPath = (role: Role) => {
    switch (role) {
        case 'MEMBER':
            return '/spots'
        case 'ORGANIZER':
            return '/spots'
        case 'ADMIN':
            return '/spots'
        default:
            return '/spots'
    }
}

export const loginAndAuthenticateUser = async ({ loginData, storeToken, authenticateUser, emitMessage, navigate, getRedirectPath, setErrorMessages, setIsLoading }: loginAndAuthenticateUserArgs): Promise<void> => {

    try {
        const res = await authService.login(loginData)
        const { authToken, role } = res.data
        storeToken(authToken)
        localStorage.setItem('role', role)
        authenticateUser(() => {
            emitMessage("Welcome back!", "regular")
            navigate(getRedirectPath(role))
        })

    } catch (err) {

        setIsLoading(false)

        const error = err as AxiosError<ErrorResponseData>

        if (error.response && error.response.status === 401) {
            const { field, message } = error.response.data
            setErrorMessages({ [field]: message })
            console.error('Login error:', error)
        }
        else {
            emitMessage("Problems logging in", "danger")
            console.error("Error details:", error.response || error)
        }
    }
}