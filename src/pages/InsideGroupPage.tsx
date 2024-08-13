import { useEffect, useState, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { AuthContext } from "@/contexts/auth.context"
import { MessageContext } from "@/contexts/message.context"
import groupServices from "@/services/group.services"
import { checkMembership } from "@/utils/checkMembership"
import { groupInitialValues } from "@/consts/groupInitialValues"
import { GroupData } from "types/group"
import { User } from "types/user"
import Chat from "@/components/Chat"
import Button from "@/components/atoms/Button"
import door from "@/assets/icons/door.svg"

const InsideGroupPage = () => {

    const navigate = useNavigate()
    const { group_id } = useParams()
    const { user } = useContext(AuthContext)
    const { emitMessage } = useContext(MessageContext)

    const [groupData, setGroupData] = useState<GroupData>(groupInitialValues)
    const [isAuthorized, setIsAuthorized] = useState(true)

    useEffect(() => {
        fetchGroupData()
    }, [])

    const fetchGroupData = async () => {
        try {
            const { data } = await groupServices.getOneGroup(group_id!)
            setGroupData(data)
            handleAuthorization(data.members)
        } catch (err) {
            console.error(err)
        }
    }

    const handleAuthorization = (members: User[]) => {
        const isMember = checkMembership(members, user._id)
        if (!isMember) {
            setIsAuthorized(false)
        }
    }

    const handleLeaveGroup = async () => {
        try {
            const res = await groupServices.leaveGroup(group_id!, user._id)
            const { message } = res.data
            if (res.status === 200) {
                emitMessage(message, "success")
                navigate('/groups')
            } else {
                emitMessage(message, "danger")
            }
        } catch (err) {
            emitMessage("unexpected_error", "danger")
            console.error(err)
        }
    }

    const { name, description, members } = groupData

    return (
        !isAuthorized ? (
            <div>UNAUTHORIZED</div>

        ) : (
            <div className="flex flex-col justify-center items-center w-full h-full">
                <h1 className="font-bold text-2xl">{name}</h1>
                <p>{description}</p>

                <div className="flex flex-col items-start p-4 w-1/2 border border-gray-500">
                    <p>Members:</p>
                    {members.map(member => {
                        const { _id, firstName, lastName, avatar } = member
                        return (
                            <div key={_id} className="flex justify-start gap-4 items-center">
                                <div className="flex flex-shrink-0 items-center justify-center w-12 h-12 overflow-hidden relative rounded-full">
                                    <img
                                        className="w-auto h-auto min-w-full min-h-full object-cover transform scale-125"
                                        src={avatar}
                                        alt={`${firstName} ${lastName}`}
                                    />
                                </div>
                                <p>{firstName}</p>
                            </div>
                        )
                    })}
                </div>
                <div className="flex flex-col items-start p-4 w-1/2 border border-gray-500">
                    <p>Messages:</p>
                    <Chat groupId={group_id!} userId={user._id} />
                </div>

                <button
                    onClick={handleLeaveGroup}
                    className="flex justify-start items-center gap-4"
                >
                    <p>Leave</p>
                    <img src={door} alt="join this group" className="w-6 h-6" />
                </button>

                <div>
                    <Button
                        text="Back to groups"
                        onClick={() => navigate('/groups')}
                    />
                </div>

            </div>
        )
    )
}

export default InsideGroupPage