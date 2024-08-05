import { LoginData, Role } from "types/user"
import { ErrorMessages } from "types/errors"
import { AuthenticateUserType, StoreTokenType } from "./auth"
import { ToasterVariant } from "./toaster"

export interface loginAndAuthenticateUserArgs {
    loginData: LoginData
    authenticateUser: AuthenticateUserType
    storeToken: StoreTokenType
    navigate: (path: string) => void
    emitMessage: (message: string, variant: ToasterVariant) => void
    getRedirectPath: (role: Role) => string
    setErrorMessages: (errors: ErrorMessages) => void
    setIsLoading: (isLoading: boolean) => void
}