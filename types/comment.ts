import { User } from "./user"

export interface CommentCreationData {
    content: string
    owner: string
}

export interface CommentData {
    content: string
    owner: User
    _id: string
}

export interface CommentThreadProps {
    spotId: string
}

export interface CreateCommentFormProps {
    refreshCommentFeed: () => void
}

export interface CommentCardProps extends CommentData {
    spotId: string
    refreshCommentFeed: () => void
}