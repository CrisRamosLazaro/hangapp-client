const userFields = [

    {
        label: 'email',
        htmlFor: "email",
        placeholder: 'email',
        type: "email",
        autoComplete: "username",
        id: "email",
        placeholderIcon: 'placeholder-dark-grafitti bg-email-input-light',
    },
    {
        label: 'avatar',
        htmlFor: 'avatar',
        placeholder: 'avatar',
        type: "file",
        autoComplete: "off",
        id: "avatar",
        placeholderIcon: 'placeholder-dark-grafitti bg-person-input-light',
    },
    {
        label: 'firstName',
        htmlFor: 'firstName',
        placeholder: 'first_name',
        type: "text",
        autoComplete: "given-name",
        id: "firstName",
        placeholderIcon: 'placeholder-dark-grafitti bg-person-input-light',
    },
    {
        label: 'lastName',
        htmlFor: 'lastName',
        placeholder: 'last_name',
        type: "text",
        autoComplete: "family-name",
        id: "lastName",
        placeholderIcon: 'placeholder-dark-grafitti bg-person-input-light',
    },
    {
        label: 'password',
        htmlFor: 'password',
        placeholder: 'password',
        type: "password",
        autoComplete: "new-password",
        id: "password",
        placeholderIcon: 'placeholder-dark-grafitti bg-password-input-light',
    }
]

export default userFields