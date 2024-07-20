import { useState, useEffect, ChangeEvent } from 'react'
import { SelectFormFieldType } from 'types/formField'
import ErrorMessage from "@/components/ErrorMessage"

const SelectFormField = ({ label, htmlFor, id, value, name, type, placeholder, placeholderIcon, onChange, optionsArr, error }: SelectFormFieldType) => {

    const [options, setOptions] = useState<string[]>([])
    const [isOpen, setIsOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        setOptions(optionsArr)
    }, [])

    const handleSelect = (option: string) => {
        onChange({ target: { value: option, name: name } } as ChangeEvent<HTMLInputElement>)
        setSearchTerm(option)
        setIsOpen(false)
    }

    const filteredOptions = options.filter(option => option.toLowerCase().includes(searchTerm.toLowerCase()))

    const selectedOption = options.find(option => option === value) || `select ${placeholder}`

    return (
        <>
            <div className="mb-3">
                <input
                    id={id}
                    className={`w-full p-2 bg-transparent border-none shadow-md text-left
                    outline-none focus:outline-none active:outline-none 
                    bg-no-repeat bg-right-10-center bg-20`}
                    name={name}
                    onClick={(e) => {
                        e.preventDefault()
                        setIsOpen(!isOpen)
                    }}
                    placeholder={selectedOption}
                    value={searchTerm}
                    type={type}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <label htmlFor={htmlFor} className="sr-only">{label}</label>
                <ErrorMessage message={error} />
            </div>
            {
                isOpen && (
                    <div className="bg-opacity-25 bg-gray-500 rounded-md shadow-md">
                        <ul className="list-none">

                            {filteredOptions.map((option, i) => (

                                <li
                                    className="flex justify-start mb-2 hover:bg-black hover:bg-opacity-25 rounded cursor-pointer"
                                    key={i}
                                    onClick={() => handleSelect(option)}
                                >
                                    <div>
                                        {option}
                                    </div>
                                </li>

                            )
                            )}

                        </ul>
                    </div>
                )}
        </>
    )
}

export default SelectFormField