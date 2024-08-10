import logoDark from '@/assets/logo.png'
import logoWhite from '@/assets/logo-white.png'
import { ToasterVariant } from 'types/messageContext'

const getVariantStyles = (variant: ToasterVariant) => {
    switch (variant) {
        case 'success':
            return {
                headerBgColor: 'bg-green-600',
                logoColor: logoWhite,
                textColor: 'text-white',
                bodyColor: 'bg-green-300',
                shadowColor: 'shadow-green-500/50',
                borderColor: 'border-green-600'
            }
        case 'danger':
            return {
                headerBgColor: 'bg-red-600',
                logoColor: logoWhite,
                textColor: 'text-white',
                bodyColor: 'bg-red-300',
                shadowColor: 'shadow-red-500/50',
                borderColor: 'border-red-600'
            }
        default:
            return {
                headerBgColor: 'bg-yellow-300',
                logoColor: logoDark,
                textColor: 'text-inherit',
                bodyColor: 'bg-white',
                shadowColor: 'shadow-yellow-500/50',
                borderColor: 'border-gray-300'
            }
    }
}

export default getVariantStyles