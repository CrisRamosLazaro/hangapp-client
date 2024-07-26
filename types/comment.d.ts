import { User } from "./user"

export interface CommentCreationData {
    content: string
    owner: string
    spotId: string
}

export interface CommentData {
    content: string
    owner: User
}

// export interface CommentThreadProps {
//     comments: CommentData[]
// }

export interface CommentThreadProps {
    spotId: string
}

export interface CreateCommentFormProps {
    refreshCommentFeed: () => void
}