import { ChatMsg } from "types/chat"

export const formatDate = (dateString: Date) => {

    const date = new Date(dateString)

    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')

    return `${hours}:${minutes}`
}

export const groupMessagesByDate = (messages: ChatMsg[]) => {

    return messages.reduce<Record<string, ChatMsg[]>>((acc, message) => {

        const date = new Date(message.createdAt).toLocaleDateString()

        if (!acc[date]) {
            acc[date] = []
        }
        acc[date].push(message)
        return acc
    }, {})
}