import { useEffect, useState } from 'react'
import chatServices from '@/services/chat.services'
import ChatCard from './cards/ChatCard'
import { ChatHistoryProps, ChatMsg } from 'types/chat'
import { groupMessagesByDate } from '@/utils/format-date-utils'

const ChatHistory: React.FC<ChatHistoryProps> = ({ groupId }) => {

    const [chatHistory, setChatHistory] = useState<ChatMsg[]>([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchPrevMessages()
    }, [page])

    const fetchPrevMessages = async () => {
        setLoading(true)
        try {
            const res = await chatServices.getAllChatMsgs(groupId, page)
            setChatHistory(prevHistory => [...res.data, ...prevHistory])
            console.log("chatHistory:", chatHistory)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {

        const target = e.currentTarget as HTMLDivElement
        if (target.scrollTop === 0 && !loading) {
            setPage(prevPage => prevPage + 1)
        }
    }

    return (
        <div
            onScroll={handleScroll}
        >

            {Object.entries(groupMessagesByDate(chatHistory)).map(([date, msgsThatDay], i) => (
                <div key={i}>
                    <hr className="mt-8 mb-4 border border-gray-700" />
                    <p className="text-center text-sm text-gray-500">{date}</p>
                    {msgsThatDay.map((msg, i) => (
                        <ChatCard
                            key={i}
                            content={msg.content}
                            owner={msg.owner}
                            createdAt={msg.createdAt}
                        />
                    ))}
                </div>
            ))}

        </div>
    )
}

export default ChatHistory