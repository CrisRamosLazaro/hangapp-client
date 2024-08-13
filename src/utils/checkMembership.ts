import { User } from "types/user"

export const checkMembership = (members: User[], userId: string) => {
    return members.some(member => member._id === userId)
}