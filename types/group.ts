import { User } from "./user"

export interface GroupCreationData {
    name: string
    description: string
    owner: string
    members: string[]
    [key: string]: any
}

export interface GroupData
    extends Omit<GroupCreationData, 'owner' | 'members'> {
    owner: User
    members: User[]
}

export interface GroupCardProps
    extends GroupData {
    refreshListOfGroups: () => void

}

export interface CreateGroupFormProps {
    refreshListOfGroups: () => void
}