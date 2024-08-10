import { User } from "./user"

export interface GroupCreationData {
    name: string
    description: string
    owner: string
    members: string[]
    [key: string]: any
}

export interface GroupCardProps
    extends Omit<GroupCreationData, 'owner'> {
    owner: User
    refreshListOfGroups: () => void

}

export interface CreateGroupFormProps {
    refreshListOfGroups: () => void
}