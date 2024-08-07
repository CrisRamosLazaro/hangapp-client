import { useContext, useState, ChangeEvent, FormEvent } from "react"
import { useNavigate, useLocation } from 'react-router-dom'
import { AuthContext } from "@/contexts/auth.context"
import { LoginData } from 'types/user'
import { ErrorMessages } from "types/errors"
import userFields from "@/consts/userFields"
import FormField from "@/components/form-fields/FormField"
import Button from "../atoms/Button"
import { validateData, loginValidationSchema } from "@/utils/validation.utils"
import { loginAndAuthenticateUser, getLoginRedirectPath } from "@/utils/auth.utils"
import { MessageContext } from "@/contexts/message.context"
import { useTranslation } from "react-i18next"
import ErrorMessage from "../atoms/ErrorMessage"

const LoginForm: React.FC = () => {

    const { t } = useTranslation()
    const navigate = useNavigate()
    const location = useLocation()

    const { authenticateUser, storeToken } = useContext(AuthContext)
    const { emitMessage } = useContext(MessageContext)

    const queryParams = new URLSearchParams(location.search)
    const message = queryParams.get('message')

    const [errorMessages, setErrorMessages] = useState<ErrorMessages>({})

    const [loginData, setLoginData] = useState<LoginData>({
        email: '',
        password: ''
    })


    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value, name } = e.target
        setErrorMessages(prevErrors => ({ ...prevErrors, [name]: '' }))
        setLoginData({ ...loginData, [name]: value })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const errors = { ...validateData(loginData, loginValidationSchema) }
        setErrorMessages(errors)

        if (Object.keys(errors).length > 0) {
            return
        }

        loginAndAuthenticateUser({
            loginData,
            storeToken,
            authenticateUser,
            navigate,
            getRedirectPath: getLoginRedirectPath,
            emitMessage,
            setErrorMessages,
        })
    }


    return (
        <div>
            <div className="px-8 py-4 border border-gray-200 rounded-lg shadow-md">

                <form onSubmit={handleSubmit}>

                    {userFields
                        .filter(field => field.id === "email" || field.id === "password")
                        .map(field => {
                            const { label, htmlFor, placeholder, type, autoComplete, id, placeholderIcon } = field

                            return (
                                <div key={id} className="mb-4">
                                    <FormField
                                        label={t(label)}
                                        htmlFor={htmlFor}
                                        placeholder={t(placeholder)}
                                        type={type}
                                        autoComplete={autoComplete}
                                        value={loginData[id]}
                                        name={id}
                                        id={id}
                                        onChange={handleInputChange}
                                        placeholderIcon={placeholderIcon}
                                        error={t(errorMessages[id])}
                                    />
                                </div>
                            )
                        })}

                    {message === "session_expired" && (
                        <ErrorMessage message={t("session_expired")} />
                    )}

                    <div className="mt-4">
                        <Button
                            text={t('login')}
                            type='submit'
                        />
                    </div>

                </form>


            </div>
        </div >
    )
}


export default LoginForm