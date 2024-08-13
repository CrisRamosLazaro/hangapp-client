import { User } from "types/user"

export const groupInitialValues = {
    name: '',
    description: '',
    owner: {} as User,
    members: [] as User[]
}