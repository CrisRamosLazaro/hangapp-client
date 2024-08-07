import { useContext, useEffect, useState, ChangeEvent, FormEvent } from "react"
import { useNavigate, Link } from 'react-router-dom'
import { useTranslation } from "react-i18next"
import { AxiosError } from 'axios'
import authService from '@/services/auth.services'
// import uploadServices from '@/services/upload.services'
import { UserSignupData, LoginData } from "types/user"
import { ErrorMessages, ErrorResponseData } from "types/errors"
import userFields from "@/consts/userFields"
import { validateData, signupValidationSchema } from "@/utils/validation.utils"
import { getSignupRedirectPath, loginAndAuthenticateUser } from "@/utils/auth.utils"
import { AuthContext } from '@/contexts/auth.context'
import { MessageContext } from "@/contexts/message.context"
import FormField from "@/components/form-fields/FormField"
import Button from "../atoms/Button"

const SignupForm: React.FC = () => {

    const navigate = useNavigate()
    const { t } = useTranslation()

    const { authenticateUser, storeToken } = useContext(AuthContext)
    const { emitMessage } = useContext(MessageContext)

    const [signupData, setSignupData] = useState<UserSignupData>({
        name: '',
        lastName: '',
        email: '',
        password: '',
        avatar: '',
    })

    const [isLoading, setIsLoading] = useState(false)
    const [loadingAvatar, setloadingAvatar] = useState(false)
    const [errorMessages, setErrorMessages] = useState<ErrorMessages>({})
    const [confirmPassword, setConfirmPassword] = useState('')
    const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false)


    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value, name } = e.target
        setErrorMessages(prevErrors => ({ ...prevErrors, [name]: '' }))
        setSignupData({ ...signupData, [name]: value })
    }


    useEffect(() => {
        if (confirmPasswordTouched && errorMessages.confirmPassword) {
            setErrorMessages(prevErrors => ({ ...prevErrors, confirmPassword: '' }))
        }
    }, [confirmPassword, confirmPasswordTouched])


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const errors = {
            ...validateData({ ...signupData, confirmPassword: confirmPassword }, signupValidationSchema),
        }
        setErrorMessages(errors)

        if (Object.keys(errors).length > 0) {
            return
        }

        try {
            await authService.signup(signupData)

            const loginData: LoginData = {
                email: signupData.email,
                password: signupData.password,
            }

            loginAndAuthenticateUser({
                loginData,
                storeToken,
                authenticateUser,
                navigate,
                getRedirectPath: getSignupRedirectPath,
                emitMessage,
                setErrorMessages,
                setIsLoading
            })

        } catch (err) {

            const error = err as AxiosError<ErrorResponseData>

            if (error.response) {
                const { status, data } = error.response

                if (status === 409) {
                    const { field, message } = data
                    setErrorMessages({ [field]: message })
                    console.error('Signup error:', error)
                } else {
                    emitMessage("problems_creating_account", "danger")
                    console.error("Error details:", error.response)
                }
            } else {
                emitMessage("problems_creating_account", "danger")
                console.error("Error details:", error)
            }
        }
    }

    // const handleFileUpload = e => {

    //    // google cloud services or AWS
    // }


    return (
        <div>
            <div className="py-4 px-8 border border-gray-200 rounded-lg shadow-md">

                <form onSubmit={handleSubmit}>

                    {userFields.map(field => {
                        const { label, htmlFor, placeholder, type, autoComplete, id, placeholderIcon } = field

                        return (
                            <div key={id} className="mb-4">
                                <FormField
                                    label={t(label)}
                                    htmlFor={htmlFor}
                                    placeholder={t(placeholder)}
                                    type={type}
                                    autoComplete={autoComplete}
                                    value={signupData[id]}
                                    name={id}
                                    id={id}
                                    onChange={handleInputChange}
                                    placeholderIcon={placeholderIcon}
                                    error={t(errorMessages[id])}
                                />
                            </div>
                        )
                    })}
                    <div className="mb-4">
                        <FormField
                            label={t('password_confirm')}
                            htmlFor='confirmPassword'
                            placeholder={t('password_confirm')}
                            type="password"
                            autoComplete="new-password"
                            value={confirmPassword}
                            name="confirmPassword"
                            id="confirmPassword"
                            onChange={e => {
                                if (!confirmPasswordTouched) setConfirmPasswordTouched(true)
                                setConfirmPassword(e.target.value)
                            }}
                            placeholderIcon='placeholder-dark-grafitti bg-password-input-light'
                            error={t(errorMessages.confirmPassword)}
                        />
                    </div>

                    {/* <div className="mb-4 flex flex-col items-start p-2">
                        <label htmlFor="image" className="mb-2">Password:</label>
                        <input
                            type="file"
                            value={avatar}
                            name="image"
                            onChange={handleFileUpload}
                            className="w-full rounded-md"
                        />
                    </div> */}


                    <div className="mt-4">
                        <Button
                            disabled={loadingAvatar}
                            type="submit"
                            text={loadingAvatar ? `${t('loading')} ➜` : `${t('signup')} ➜`}
                        />
                    </div>

                </form>
            </div>
            <p
                className={`w-full text-center mb-4 mt-4`}>
                {t("already_have_an_account")}{" "}
                <Link
                    className={`no-underline font-bold hover:text-highlight-coral`}
                    to="/login"
                >
                    {t("login2")}
                </Link>
            </p>
        </div>
    )
}

export default SignupForm