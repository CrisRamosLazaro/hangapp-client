export type FormFieldType = {
    label: string
    htmlFor: string
    placeholder: string
    placeholderIconLight: string
    placeholderIconDark: string
    type: string
    value: string
    name: string
    id: string
    autoComplete: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    error?: string
}

