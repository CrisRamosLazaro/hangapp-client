import { useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "@/contexts/auth.context"
import { MessageContext } from "@/contexts/message.context"
import groupServices from "@/services/group.services"
import { checkMembership } from "@/utils/checkMembership"
import { GroupCardProps } from "types/group"
import ButtonDelete from "../atoms/ButtonDelete"
import star from "@/assets/icons/star-full.svg"
import door from "@/assets/icons/door-white.svg"
import join from "@/assets/icons/join-white.svg"

const GroupCard: React.FC<GroupCardProps> = ({ _id, name, description, members, owner, refreshListOfGroups }) => {

    const { user } = useContext(AuthContext)
    const { emitMessage } = useContext(MessageContext)
    const navigate = useNavigate()

    const [isMember, setIsMember] = useState(false)

    useEffect(() => {
        setIsMember(checkMembership(members, user._id))
    }, [members, user._id])

    const navigateToGroup = () => {
        navigate(`/groups/${_id}`)
    }

    const handleJoinGroup = async () => {
        try {
            const res = await groupServices.joinGroup(_id, user._id)
            const { message } = res.data
            if (res.status === 200) {
                emitMessage(message, "success")
                navigateToGroup()
            } else {
                emitMessage(message, "danger")
            }
        } catch (err) {
            emitMessage("unexpected_error", "danger")
            console.error(err)
        }
    }

    const handleDeleteGroup = () => {
        groupServices.deleteGroup(_id)
            .then(() => refreshListOfGroups())
            .catch(err => console.error(err))
    }

    return (
        <div className="mt-8 flex flex-col justify-between rounded-lg shadow-md bg-white border border-gray-200 w-[350px] h-[500px]">
            <div>
                {/* Header */}
                <div className="bg-yellow-600 p-4 flex justify-between rounded-t-lg">
                    <h1 className="text-2xl font-bold text-white">
                        {name}
                    </h1>
                    {
                        isMember ? (
                            <button
                                onClick={navigateToGroup}
                                className="flex justify-center items-center px-4 rounded-lg hover:bg-yellow-800"
                            >
                                <img src={door} alt="enter" className="w-6 h-6" />
                            </button>
                        ) : (
                            <button
                                onClick={handleJoinGroup}
                                className="flex justify-center items-center px-4 rounded-lg hover:bg-yellow-800"
                            >
                                <img src={join} alt="join" className="w-6 h-6" />
                            </button>
                        )
                    }
                </div>

                {/* Description */}
                <div className="px-4 py-2 h-20">
                    <p className="text-left">
                        {description}
                    </p>
                </div>

                {/* Member list */}
                <div className="mt-2 mx-4 px-4 pt-2 pb-4 bg-yellow-700 bg-opacity-15 rounded-lg">
                    <p className="text-left pb-2"> Members:</p>
                    {members.map((member, i) => {
                        const { firstName, lastName, avatar, _id } = member
                        return (
                            <div
                                key={i}
                                className="flex justify-start items-center gap-5 shadow-md bg-white border border-gray-200 px-4 py-2 hover:bg-slate-400 hover:bg-opacity-45 rounded-lg"
                            >
                                <div className="flex items-center justify-center w-14 h-14 overflow-hidden relative rounded-full">
                                    <img
                                        className="w-auto h-auto min-w-full min-h-full object-cover transform scale-125"
                                        src={avatar}
                                        alt={`check out ${firstName}'s profile`}
                                    />
                                </div>
                                <p>{firstName} {lastName}</p>

                                {_id === owner._id && (
                                    <img src={star} className="w-4 h-4" />
                                )}
                            </div>
                        )
                    })}
                </div>

            </div>
            {
                (user!._id === owner._id || user!.role === 'ADMIN') &&
                <div className="flex justify-end rounded-b-lg p-2">
                    <ButtonDelete onClick={handleDeleteGroup} />
                </div>

            }
        </div>
    )
}

export default GroupCard