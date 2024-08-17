import { useEffect, useState } from 'react'
import chatServices from '@/services/chat.services'
import ChatCard from './cards/ChatCard'
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


    return (
        <div>
            {chatHistory.map((msg, i) => (
                <ChatCard
                    key={i}
                    content={msg.content}
                    owner={msg.owner}
                    createdAt={msg.createdAt}
                />
            ))}
        </div>
    )
}

export default ChatHistory