import CreateGroupForm from "@/components/forms/CreateGroupForm"
import GroupCard from "@/components/cards/GroupCard"
import { useState, useEffect } from "react"
import groupServices from "@/services/group.services"
import { GroupCardProps } from "types/group"
import Chat from "@/components/Chat"

const GroupsPage = () => {

    const [allGroupsData, setAllGroupsData] = useState<GroupCardProps[]>([])

    useEffect(() => {
        fetchAllGroups()
    }, [])

    const fetchAllGroups = async () => {

        try {
            const res = await groupServices.getAllGroups()
            setAllGroupsData(res.data)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className='flex flex-col justify-center items-center min-h-full'>
            <CreateGroupForm refreshListOfGroups={fetchAllGroups} />
            <hr className="w-full border-t-2 border-gray-300 my-4" />

            <Chat />
            <hr className="w-full border-t-2 border-gray-300 my-4" />

            <div className="flex flex-col p-2">
                <h1 className="font-bold">Browse groups</h1>
                <div className='flex justify-between items-center gap-5'>

                    {allGroupsData.map((group, i) => {
                        const { _id } = group
                        return (
                            <GroupCard
                                key={i}
                                {...group}
                                refreshListOfGroups={fetchAllGroups} />
                        )
                    })
                    }
                </div>

            </div>
        </div>
    )
}

export default GroupsPage