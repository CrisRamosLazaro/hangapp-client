import { createContext, useState } from 'react'
import { MessageContextInterface, MessageProviderWrapperProps, ToasterVariant } from 'types/messageContext'

const defaultState: MessageContextInterface = {
    toastMessage: '',
    emitMessage: () => { },
    showToast: false,
    isHiding: false,
    closeMessage: () => { },
    variant: 'regular'
}

const MessageContext = createContext<MessageContextInterface>(defaultState)

const MessageProviderWrapper: React.FC<MessageProviderWrapperProps> = ({ children }) => {

    const [showToast, setShowToast] = useState<boolean>(false)
    const [toastMessage, setToastMessage] = useState<string>('')
    const [isHiding, setIsHiding] = useState(false)
    const [variant, setVariant] = useState<ToasterVariant>("regular")


    const emitMessage = (text: string, variantType: ToasterVariant) => {
        setToastMessage(text)
        setVariant(variantType)
        setShowToast(true)
    }

    const closeMessage = () => {
        setIsHiding(true)
        setTimeout(() => {
            setShowToast(false)
            setIsHiding(false)
        }, 500)
    }

    return (
        <MessageContext.Provider
            value={{ toastMessage, emitMessage, showToast, isHiding, closeMessage, variant }}
        >
            {children}
        </MessageContext.Provider>
    )
}

export { MessageContext, MessageProviderWrapper }