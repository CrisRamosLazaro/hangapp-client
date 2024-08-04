import { createContext, useState, ReactNode } from 'react'

interface MessageContextInterface {
    toastMessage: string
    emitMessage: (text: string) => void
    showToast: boolean
    isHiding: boolean
    closeMessage: () => void
}

const defaultState: MessageContextInterface = {
    toastMessage: 'null',
    emitMessage: () => { },
    showToast: false,
    isHiding: false,
    closeMessage: () => { },
}


interface MessageProviderWrapperProps {
    children: ReactNode
}

const MessageContext = createContext<MessageContextInterface>(defaultState)

const MessageProviderWrapper: React.FC<MessageProviderWrapperProps> = ({ children }) => {

    const [showToast, setShowToast] = useState<boolean>(false)
    const [toastMessage, setToastMessage] = useState<string>('Testing')
    const [isHiding, setIsHiding] = useState(false)


    const emitMessage = (text: string) => {
        setToastMessage(text)
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
            value={{ toastMessage, emitMessage, showToast, isHiding, closeMessage }}
        >
            {children}
        </MessageContext.Provider>
    )
}

export { MessageContext, MessageProviderWrapper }