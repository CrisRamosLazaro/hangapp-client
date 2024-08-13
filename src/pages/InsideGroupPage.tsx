import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import groupServices from "@/services/group.services"
import { groupInitialValues } from "@/consts/groupInitialValues"
import { GroupData } from "types/group"
import Button from "@/components/atoms/Button"

const InsideGroupPage = () => {

    const navigate = useNavigate()

    const { group_id } = useParams()
    const [groupData, setGroupData] = useState<GroupData>(groupInitialValues)

    useEffect(() => {
        fetchGroupData()
    }, [])

    const fetchGroupData = async () => {
        try {
            const { data } = await groupServices.getOneGroup(group_id!)
            setGroupData(data)
        } catch (err) {
            console.error(err)
        }
    }

    const { name, description, members } = groupData

    return (
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
            </div>

            <div>
                <Button
                    text="Back to groups"
                    onClick={() => navigate('/groups')}
                />
            </div>

        </div>
    )
}

export default InsideGroupPage