import { ReactNode } from 'react'

export interface MessageContextInterface {
    toastMessage: string
    emitMessage: (text: string, variant: ToasterVariant) => void
    showToast: boolean
    isHiding: boolean
    closeMessage: () => void
    variant: ToasterVariant
}

export interface MessageProviderWrapperProps {
    children: ReactNode
}

export type ToasterVariant = 'success' | 'danger' | 'regular'