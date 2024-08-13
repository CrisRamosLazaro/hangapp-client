import { io } from 'socket.io-client'
import { useEffect, useState, ChangeEvent } from 'react'
import { ChatProps } from 'types/chat'


const socket = io(import.meta.env.VITE_SOCKET_CHAT_URL, {
    transports: ['websocket', 'polling'],
})

const Chat: React.FC<ChatProps> = ({ groupId, userId }) => {

    const [room, setRoom] = useState("")

    const [message, setMessage] = useState("")
    const [messagesReceived, setMessagesReceived] = useState<string[]>([])


    useEffect(() => {
        // socket.on('connection', () => {
        //     console.log('Connected to server with ID:', socket.id)
        // })

        socket.emit("join_room", groupId)

        socket.on("receive_message", data => {
            setMessagesReceived(prevMessages => [...prevMessages, data.message]);
        })

        // socket.on('disconnect', () => {
        //     console.log('Disconnected from server')
        // })

        socket.on('connect_error', (err) => {
            console.error('Connection Error:', err)
        })

        return () => {
            // socket.off('connect')
            // socket.off('disconnect')
            socket.off('receive_message')
            socket.off('connect_error')
        }
    }, [socket])

    const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setMessage(e.target.value)
    }

    const joinRoom = () => { //implement room made of _ids of 2 users / setRoom automatically on chat window?
        if (room !== "") {
            socket.emit("join_room", room)
        }
    }

    // const sendMessage = () => {
    //     socket.emit("chat_message", { message, room })
    // }

    const sendMessage = (e: React.FormEvent) => {
        e.preventDefault()
        socket.emit("chat_message", { message, room: groupId, userId })
        setMessage("")
    }

    return (
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
            <h1>Message:</h1>
            <div>
                {messagesReceived.map((msg, i) => (
                    <p key={i}>{msg}</p>
                ))}
            </div>
        </form>
    )
}

export default Chat