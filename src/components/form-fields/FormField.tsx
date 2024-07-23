import { useState } from 'react'
import { FormFieldType } from 'types/formField'
import ErrorMessage from "@/components/ErrorMessage"

const FormField = ({ label, htmlFor, placeholder, placeholderIcon, type, value, name, id, autoComplete, onChange, error }: FormFieldType) => {

    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible)
    }

    const classCss = `w-full bg-transparent border-none shadow-md outline-none p-2 rounded-md bg-no-repeat bg-right-10-center bg-20 focus:bg-yellow-100 focus:bg-opacity-50 ${placeholderIcon}`

    const inputProps = {
        className: classCss + (type === 'textarea' ? ' h-16' : ''),
        placeholder: placeholder,
        autoComplete: autoComplete || "on",
        value: value,
        name: name,
        id: id,
        onChange: onChange,
    }

    const inputField = type === 'textarea' ? (
        <textarea {...inputProps} />
    ) : (
        <input
            {...inputProps}
            type={type === 'password' ? (isPasswordVisible ? 'text' : 'password') : type}
        />
    )

    return (
        <div className="mb-3">
            <label className="sr-only" htmlFor={htmlFor}>{label}</label>
            <div className="relative">
                {inputField}
                {type === 'password' && (
                    <button
                        onClick={togglePasswordVisibility}
                        type="button"
                        className="absolute inset-y-0 right-0 pr-8 flex items-center text-sm leading-5"
                    >
                        {isPasswordVisible ? 'Hide' : 'Show'}
                    </button>
                )}
            </div>
            <ErrorMessage message={error} />
        </div>
    )
}

export default FormField