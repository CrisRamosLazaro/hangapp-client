import { useState, useContext, ChangeEvent, FormEvent } from 'react'
import { AuthContext } from '@/contexts/auth.context'
import groupFields from '@/consts/groupFields'
import FormField from '../form-fields/FormField'
import { GroupCreationData, CreateGroupFormProps } from 'types/group'
import Button from '../atoms/Button'
import groupServices from '@/services/group.services'

const CreateGroupForm: React.FC<CreateGroupFormProps> = ({ refreshListOfGroups }) => {

    const { user } = useContext(AuthContext)

    const groupInitialValues = {
        name: '',
        description: '',
        owner: user!._id,
        members: [user!._id],
    }

    const [groupData, setGroupData] = useState<GroupCreationData>(groupInitialValues)

    const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const { name, value } = e.target
        setGroupData({ ...groupData, [name]: value })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        groupServices
            .createGroup(groupData)
            .then(() => {
                refreshListOfGroups()
                setGroupData(groupInitialValues)
            })
            .catch(err => console.error(err))
    }


    return (
        <form onSubmit={handleSubmit}>

            {groupFields.map(field => {
                const { label, placeholder, type, autoComplete, id } = field
                return (
                    <FormField
                        key={id}
                        label={label}
                        htmlFor={id}
                        name={id}
                        id={id}
                        type={type}
                        autoComplete={autoComplete}
                        placeholder={placeholder}
                        value={groupData[id]}
                        onChange={handleInputChange}
                    />
                )
            })}


            <div className="mt-4">
                <Button
                    text='Create new group'
                    type='submit'
                />
            </div>
        </form>
    )

}

export default CreateGroupForm