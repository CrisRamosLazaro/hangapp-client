import { useEffect, useState, ChangeEvent, useContext } from 'react'
import chatServices from '@/services/chat.services'
import { ChatHistoryProps, ChatMsg } from 'types/chat'


const ChatHistory: React.FC<ChatHistoryProps> = ({ groupId }) => {

    const [chatHistory, setChatHistory] = useState<ChatMsg[]>([])

    useEffect(() => {
        fetchPrevMessages()
    }, [])

    const fetchPrevMessages = async () => {
        try {
            const res = await chatServices.getAllChatMsgs(groupId)
            setChatHistory(res.data)
            console.log("chatHistory:", chatHistory)
        } catch (err) {
            console.error(err)
        }
    }

    const formatDate = (dateString: Date) => {
        const date = new Date(dateString)

        const day = date.getDate()
        const month = date.toLocaleString('default', { month: 'short' })
        const year = date.getFullYear()
        const hours = date.getHours().toString().padStart(2, '0')
        const minutes = date.getMinutes().toString().padStart(2, '0')

        return `${day} ${month} ${year} - ${hours}:${minutes}`
    }


    return (
        <div>
            {chatHistory.map((msg, i) => {
                const { content, owner, createdAt } = msg
                const { firstName, lastName, avatar } = owner
                return (
                    <div key={i} className="border-b border-b-slate-500">
                        <div className="flex justify-between">
                            <p>By: {firstName} {lastName}</p>
                            <p>At: {formatDate(createdAt)}</p>
                        </div>
                        <p>{content}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default ChatHistory