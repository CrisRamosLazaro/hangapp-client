import { UserSignupData } from "types/user"
import { ValidationSchema } from "types/auth"
import { ErrorMessages } from "types/errors"

export const signupValidationSchema = {
    email: 'email_required',
    password: 'password_required',
    confirmPassword: 'password_confirmation_required'
}

export const validateData = (data: UserSignupData, validationSchema: ValidationSchema) => {

    const errors: ErrorMessages = {}

    if (data.role && data.role === 'ORGANIZER') {
        if (!data.firstName) {
            errors.firstName = 'this_field_is_required'
        }
        if (!data.lastName) {
            errors.lastName = 'this_field_is_required'
        }
    }

    for (const field in validationSchema) {
        if (!data[field]) {
            errors[field] = validationSchema[field]
        }
    }

    if (data.password && data.password.length < 4) {
        errors.password = 'password_must_be_at_least_4_characters'
    }

    if (data.password && data.confirmPassword &&
        data.password !== data.confirmPassword) {
        errors.confirmPassword = 'passwords_dont_match'
    }

    return errors
}