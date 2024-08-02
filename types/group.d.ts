import { User } from "./user"

export interface GroupCreationData {
    name: string
    description: string
    owner: string
    members: string[]
    [key: string]: any
}