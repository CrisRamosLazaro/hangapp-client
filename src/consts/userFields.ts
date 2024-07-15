const userFields = [

    {
        label: 'email',
        htmlFor: "email",
        placeholder: 'email',
        type: "email",
        autoComplete: "username",
        id: "email",
        placeholderIconLight: 'placeholder-dark-grafitti bg-email-input-light',
        placeholderIconDark: 'placeholder-white bg-email-input-dark',
    },
    {
        label: 'avatar',
        htmlFor: 'avatar',
        placeholder: 'avatar',
        type: "file",
        autoComplete: "off",
        id: "avatar",
        placeholderIconLight: 'placeholder-dark-grafitti bg-phone-input-light',
        placeholderIconDark: 'placeholder-white bg-phone-input-dark',
    },
    {
        label: 'firstName',
        htmlFor: 'firstName',
        placeholder: 'first_name',
        type: "text",
        autoComplete: "given-name",
        id: "firstName",
        placeholderIconLight: 'placeholder-dark-grafitti bg-person-input-light',
        placeholderIconDark: 'placeholder-white bg-person-input-dark',
    },
    {
        label: 'lastName',
        htmlFor: 'lastName',
        placeholder: 'last_name',
        type: "text",
        autoComplete: "family-name",
        id: "lastName",
        placeholderIconLight: 'placeholder-dark-grafitti bg-person-input-light',
        placeholderIconDark: 'placeholder-white bg-person-input-dark',
    },
    {
        label: 'password',
        htmlFor: 'password',
        placeholder: 'password',
        type: "password",
        autoComplete: "new-password",
        id: "password",
        placeholderIconLight: 'placeholder-dark-grafitti bg-password-input-light',
        placeholderIconDark: 'placeholder-white bg-password-input-dark',
    }
]

export default userFields