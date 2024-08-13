import { io } from 'socket.io-client'
import { useEffect, useState, ChangeEvent } from 'react'


const socket = io(import.meta.env.VITE_SOCKET_CHAT_URL, {
    transports: ['websocket', 'polling'],
})

const Chat = () => {

    const [room, setRoom] = useState("")

    const [message, setMessage] = useState("")
    const [messagesReceived, setMessagesReceived] = useState("")
    // const [messagesReceived, setMessagesReceived] = useState([])


    useEffect(() => {
        // socket.on('connection', () => {
        //     console.log('Connected to server with ID:', socket.id)
        // })

        socket.on("receive_message", data => {
            setMessagesReceived(data.message)

        })

        // socket.on('disconnect', () => {
        //     console.log('Disconnected from server')
        // })

        socket.on('connect_error', (err) => {
            console.error('Connection Error:', err)
        })

        // return () => {
        //     socket.off('connect')
        //     socket.off('disconnect')
        //     socket.off('connect_error')
        // }
    }, [socket])

    const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setMessage(e.target.value)
    }

    const joinRoom = () => { //implement room made of _ids of 2 users / setRoom automatically on chat window?
        if (room !== "") {
            socket.emit("join_room", room)
        }
    }

    const sendMessage = () => {
        socket.emit("chat_message", { message, room })
    }

    return (
        <form  >
            <input
                placeholder='write_your_message'
                onChange={handleInputChange}

            />
            <button
                type="submit"
                onClick={sendMessage}
            >
                SEND!
            </button>
            <h1>Message:</h1>
            <p>{messagesReceived}</p>
        </form>
    )
}

export default Chat