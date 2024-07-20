export type FormFieldType = {
    component?: string
    optionsArr?: Array<string>
    label: string
    htmlFor: string
    placeholder: string
    placeholderIcon?: string
    type: string
    value: string
    name: string
    id: string
    autoComplete: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    error?: string
}

export interface SelectFormFieldType
    extends Omit<FormFieldType, 'optionsArr'> {
    optionsArr: Array<string>
}