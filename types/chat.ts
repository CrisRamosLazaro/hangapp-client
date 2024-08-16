import { User } from "./user"

export interface ChatProps {
    groupId: string
    userId: string
}

export interface ChatHistoryProps extends Omit<ChatProps, 'userId'> { }

export interface ChatMsgCreationData {
    content: string
    owner: string
}

export interface ChatMsg extends Omit<ChatMsgCreationData, 'owner'> {
    owner: User
    createdAt: Date
}