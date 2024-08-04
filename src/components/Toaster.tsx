import { useContext, useEffect } from 'react'
import { MessageContext } from '@/contexts/message.context'
import logo from '@/assets/logo.png'

const Toaster = () => {

    const context = useContext(MessageContext)

    if (!context) {
        throw new Error('The Toaster component must be used within a MessageProviderWrapper')
    }

    const { toastMessage, showToast, isHiding, closeMessage } = context

    useEffect(() => {
        if (showToast) {
            const timer = setTimeout(() => {
                closeMessage()
            }, 3000)

            return () => clearTimeout(timer)
        }
    }, [showToast, closeMessage])

    return (
        showToast && (
            <div className={`fixed bottom-12 right-4 bg-white border border-gray-300 rounded-lg shadow-lg
                 ${isHiding ? 'animate-hide' : ''}`}
            >
                <div className="flex justify-between items-center bg-yellow-300 p-2">
                    <div className="flex justify-start items-center gap-2">
                        <img src={logo} alt="hangapp logo" className="w-4 h-4" />
                        <p>Hangapp</p>
                    </div>
                    <button
                        className="text-gray-500 hover:text-gray-700"
                        onClick={closeMessage}
                    >
                        &times;
                    </button>
                </div>
                <div className="mt-2 px-6 py-3">
                    {toastMessage}
                </div>
            </div>
        )
    )
}

export default Toaster