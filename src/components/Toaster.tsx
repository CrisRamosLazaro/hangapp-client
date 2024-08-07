import { useContext, useEffect } from 'react'
import { MessageContext } from '@/contexts/message.context'
import getVariantStyles from '@/utils/toaster-style-setting.utils'
import { useTranslation } from 'react-i18next'

const Toaster: React.FC = () => {

    const context = useContext(MessageContext)
    const { t } = useTranslation()

    if (!context) {
        throw new Error('The Toaster component must be used within a MessageProviderWrapper')
    }

    const { toastMessage, showToast, isHiding, closeMessage, variant } = context

    useEffect(() => {
        if (showToast) {
            const timer = setTimeout(() => {
                closeMessage()
            }, 3000)

            return () => clearTimeout(timer)
        }
    }, [showToast, closeMessage])

    const { headerBgColor, logoColor, textColor, bodyColor, borderColor, shadowColor } = getVariantStyles(variant)

    return (
        showToast && (
            <div className={`fixed bottom-12 right-4 border rounded-lg shadow-lg 
                ${borderColor}
                ${shadowColor}
                ${bodyColor}
                ${isHiding ? 'animate-hide' : ''}`}
            >
                <div className={`flex justify-between items-center p-2
                     ${headerBgColor}`}
                >
                    <div className="flex justify-start items-center gap-2">
                        <img
                            src={logoColor}
                            alt="hangapp logo"
                            className="w-4 h-4"
                        />
                        <p className={textColor}>Hangapp</p>
                    </div>
                    <button
                        className={textColor}
                        onClick={closeMessage}
                    >
                        &times;
                    </button>
                </div>
                <div className={`mt-2 px-6 py-3`}>
                    {t(toastMessage)}
                </div>
            </div>
        )
    )
}

export default Toaster