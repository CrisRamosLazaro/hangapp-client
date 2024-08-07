import { LoginData, Role } from "./user"
import { ErrorMessages } from "./errors"
import { ToasterVariant } from "./toaster"

export type AuthenticateUserType = (callback: () => void) => void

export type StoreTokenType = (token: string) => void

export interface AuthContextInterface {
    user: User | null
    setUser: Dispatch<SetStateAction<User | null>>
    authenticateUser: AuthenticateUserType
    storeToken: StoreTokenType
    logout: () => void
    isLoading: boolean
}

export interface loginAndAuthenticateUserArgs {
    loginData: LoginData
    authenticateUser: AuthenticateUserType
    storeToken: StoreTokenType
    navigate: (path: string) => void
    emitMessage: (message: string, variant: ToasterVariant) => void
    getRedirectPath: (role: Role) => string
    setErrorMessages: (errors: ErrorMessages) => void
}

export interface ValidationSchema {
    [key: string]: string
}