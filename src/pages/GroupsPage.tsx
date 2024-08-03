import CreateGroupForm from "@/components/forms/CreateGroupForm"
import GroupCard from "@/components/cards/GroupCard"
import { useState, useEffect } from "react"
import groupServices from "@/services/group.services"
import { GroupCardProps } from "types/group"

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
            <hr />
            <div className="flex flex-col p-2">
                <h1 className="font-bold">Browse groups</h1>
                <div className='flex justify-between items-center gap-5'>
                    {allGroupsData.map((group, i) => (
                        <GroupCard {...group} refreshListOfGroups={fetchAllGroups}
                            key={i} />
                    ))}
                </div>

            </div>
        </div>
    )
}

export default GroupsPage