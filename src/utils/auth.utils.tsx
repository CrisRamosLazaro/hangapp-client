import authService from '@/services/auth.services'
import { Role } from 'types/user'
import { loginAndAuthenticateUserArgs } from 'types/auth'
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

export const loginAndAuthenticateUser = async ({
    loginData,
    storeToken,
    authenticateUser,
    emitMessage,
    navigate,
    getRedirectPath,
    setErrorMessages,
}: loginAndAuthenticateUserArgs): Promise<void> => {

    try {
        const res = await authService.login(loginData)
        const { authToken, role } = res.data
        storeToken(authToken)
        localStorage.setItem('role', role)
        authenticateUser(() => {
            navigate(getRedirectPath(role))
        })

    } catch (err) {

        const error = err as AxiosError<ErrorResponseData>

        if (error.response) {
            const { status, data } = error.response

            if (status === 401) {
                const { field, message } = data
                setErrorMessages({ [field]: message })
                console.error('Login error:', error)

            } else if (status === 400) {
                const { message } = data
                emitMessage(message, "danger")
                console.error('Login error:', error)

            } else if (status === 500) {
                emitMessage("internal_server_error", "danger")
                console.error('Internal Server Error:', error)

            } else {
                emitMessage("problems_logging_in", "danger")
                console.error("Error details:", error.response)
            }
        } else {
            emitMessage("problems_logging_in", "danger")
            console.error("Error details:", error)
        }
    }
}