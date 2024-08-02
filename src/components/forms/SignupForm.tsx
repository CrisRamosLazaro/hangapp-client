import { useContext, useState, ChangeEvent, FormEvent } from "react"
import { useNavigate } from 'react-router-dom'
import authService from '@/services/auth.services'
// import uploadServices from '@/services/upload.services'
import { UserSignupData } from "types/user"
import { ErrorMessages } from "types/errors"
import userFields from "@/consts/userFields"
import FormField from "@/components/form-fields/FormField"
import Button from "../atoms/Button"

const SignupForm: React.FC = () => {

    const [signupData, setSignupData] = useState<UserSignupData>({
        name: '',
        lastName: '',
        email: '',
        password: '',
        avatar: '',
    })

    const [loadingAvatar, setloadingAvatar] = useState(false)
    const [errorMessages, setErrorMessages] = useState<ErrorMessages>({})
    const [confirmPassword, setConfirmPassword] = useState('')
    const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false)

    const navigate = useNavigate()

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value, name } = e.target
        setSignupData({ ...signupData, [name]: value })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault()

        authService
            .signup(signupData)
            .then(({ data }) => navigate('/login'))
            .catch(err => { setErrorMessages(err.response.data.errorMessages) })
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
                                    label={label}
                                    htmlFor={htmlFor}
                                    placeholder={placeholder}
                                    type={type}
                                    autoComplete={autoComplete}
                                    value={signupData[id]}
                                    name={id}
                                    id={id}
                                    onChange={handleInputChange}
                                    placeholderIcon={placeholderIcon}
                                    error={errorMessages[id]}
                                />
                            </div>
                        )
                    })}
                    <div className="mb-4">
                        <FormField
                            label={'password_confirm'}
                            htmlFor='confirmPassword'
                            placeholder={'password_confirm'}
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
                            error={errorMessages.confirmPassword}
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
                            text={loadingAvatar ? 'LOADING IMAGE...' : 'SIGNUP'}
                        />
                    </div>

                </form>
            </div>
        </div>
    )
}


export default SignupForm