import { useState, useEffect, useContext } from "react"
import { AuthContext } from "@/contexts/auth.context"
import groupServices from "@/services/group.services"
import CreateGroupForm from "@/components/forms/CreateGroupForm"
import GroupCard from "@/components/cards/GroupCard"
import { GroupCardProps } from "types/group"

const GroupsPage = () => {

    const { user } = useContext(AuthContext)

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
            {user.role === 'ORGANIZER' &&
                <>
                    <CreateGroupForm refreshListOfGroups={fetchAllGroups} />
                    <hr className="w-full border-t-2 border-gray-300 my-4" />
                </>
            }

            <div className="flex flex-col p-2">
                <h1 className="font-bold">Browse groups</h1>
                <div className='w-full flex justify-start items-center gap-5 flex-wrap px-4'>

                    {allGroupsData.map((group, i) => {
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