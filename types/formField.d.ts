export interface BaseFieldType {
    label: string
    htmlFor: string
    placeholder?: string
    value: string
    name: string
    id: string
    autoComplete?: string
    type?: string
    optionsArr?: string[]

}

export interface FormFieldType extends BaseFieldType {
    component?: string
    placeholderIcon?: string
    type: string
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    error?: string
}

export interface SelectFormFieldType extends BaseFieldType {
    optionsArr: string[]
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    error?: string
}

export interface CheckboxFormFieldType {
    optionsArr: string[]
    selectedOptions: string[]
    placeholder: string
    onChange: (selected: string[]) => void
}

interface RatingStarsProps {
    userRating: number
    isEditing: boolean
    onChange: (rating: number) => void
}