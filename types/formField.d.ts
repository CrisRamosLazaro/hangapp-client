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
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    error?: string
}

export interface SelectFormFieldType
    extends Omit<FormFieldType, 'optionsArr' | 'onChange'> {
    optionsArr: Array<string>
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export interface CheckboxFormFieldType {
    options: string[]
    selectedOptions: string[]
    onChange: (selected: string[]) => void

    placeholder: string
}