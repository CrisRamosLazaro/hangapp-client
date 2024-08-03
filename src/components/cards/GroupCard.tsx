import { GroupCardProps } from "types/group"
import star from "@/assets/icons/star-full.svg"
import door from "@/assets/icons/door.svg"
import { AuthContext } from "@/contexts/auth.context"
import { useContext } from "react"
import ButtonDelete from "../atoms/ButtonDelete"
import groupServices from "@/services/group.services"
import { User } from "types/user"

const GroupCard: React.FC<GroupCardProps> = ({ _id, name, description, members, owner, refreshListOfGroups }) => {

    const { user } = useContext(AuthContext)

    const handleDeleteGroup = () => {

        groupServices.deleteGroup(_id)
            .then(() => refreshListOfGroups())
            .catch(err => console.error(err))
    }

    return (
        <div className="mt-8 flex flex-col rounded-lg shadow-md bg-white border border-gray-200 w-1/2 min-h-[400px]">
            <div className="bg-gray-800 p-4">
                <h1 className="text-2xl font-bold text-white">
                    {name}
                </h1>
            </div>
            <div className="px-4 py-2 min-h-20">
                <p className="text-left">
                    {description}
                </p>
            </div>
            <div className="px-4 py-2">
                <div className="flex justify-start items-center gap-4">
                    <p>Join</p>
                    <img src={door} alt="join this group" className="w-6 h-6" />
                </div>
                <div className="px-4 py-2">
                    <p className="text-left pb-2"> Members:</p>
                    {members.map((member: User, i: string) => {
                        const { firstName, lastName, avatar, role } = member
                        return (
                            <div
                                key={i}
                                className="flex justify-start items-center gap-5 shadow-md bg-white border border-gray-200 px-4 py-2 hover:bg-yellow-100 rounded-lg"
                            >
                                <div className="flex items-center justify-center w-16 h-16 overflow-hidden relative rounded-full">
                                    <img
                                        className="w-auto h-auto min-w-full min-h-full object-cover transform scale-125"
                                        src={avatar}
                                        alt={`check out ${firstName}'s profile`}
                                    />
                                </div>
                                <p>{firstName} {lastName}</p>
                                {role === 'ORGANIZER' && (
                                    <img src={star} className="w-8 h-8" />
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
            {
                (user!._id === owner._id || user!.role === 'ADMIN') &&
                <div className="flex justify-end items-center rounded-b-lg mt-3">
                    <ButtonDelete onClick={handleDeleteGroup} />
                </div>

            }
        </div>
    )
}

export default GroupCard