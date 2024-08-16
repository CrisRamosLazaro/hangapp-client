import { io } from 'socket.io-client'
import { useEffect, useState, ChangeEvent, useContext } from 'react'
import { MessageContext } from '@/contexts/message.context'
import chatServices from '@/services/chat.services'
import ChatHistory from './ChatHistory'
import { ChatProps } from 'types/chat'


const socket = io(import.meta.env.VITE_SOCKET_CHAT_URL, {
    transports: ['websocket', 'polling'],
})

const Chat: React.FC<ChatProps> = ({ groupId, userId }) => {

    const { emitMessage } = useContext(MessageContext)

    const [room, setRoom] = useState("")

    const [message, setMessage] = useState("")
    const [messagesReceived, setMessagesReceived] = useState<string[]>([])


    useEffect(() => {

        socket.emit("join_room", groupId)

        socket.on('connection', () => {
            emitMessage('you_re_connected', 'success')
            console.log('Connected to server with ID:', socket.id)
        })

        socket.on("receive_message", data => {
            setMessagesReceived(prevMessages => [...prevMessages, data.message])
        })

        socket.on('disconnect', () => {
            emitMessage('you_re_disconnected', 'danger')
            console.log('Disconnected from server')
        })

        socket.on('connect_error', (err) => {
            console.error('Connection Error:', err)
        })

        return () => {
            socket.off('connection')
            socket.off('disconnect')
            socket.off('receive_message')
            socket.off('connect_error')
        }
    }, [socket])

    const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setMessage(e.target.value)
    }

    const sendMessage = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            socket.emit("chat_message", { message, room: groupId, userId })

            const createdMsg = { content: message, owner: userId }
            await chatServices.createChatMsg(groupId, createdMsg)
            setMessage("")

        } catch (err) {
            emitMessage('couldnt_send_message', 'danger')
            console.error(err)
        }
    }

    return (
        <div>
            <ChatHistory groupId={groupId} />
            <div>
                {messagesReceived.map((msg, i) => (
                    <div key={i}>
                        {msg}
                    </div>
                ))}
            </div>
            <form onSubmit={sendMessage}>
                <input
                    placeholder='write_your_message'
                    value={message}
                    onChange={handleInputChange}

                />
                <button
                    type="submit"
                    className=""
                >
                    SEND!
                </button>
            </form>
        </div>
    )
}

export default Chat