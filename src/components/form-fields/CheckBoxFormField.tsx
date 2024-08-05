// import { useState, useEffect, ChangeEvent } from 'react'
import { CheckboxFormFieldType } from 'types/formField'

const CheckboxFormField: React.FC<CheckboxFormFieldType> = ({ optionsArr, selectedOptions, placeholder, onChange }) => {

    const handleCheckboxChange = (option: string) => {
        if (selectedOptions.includes(option)) {
            onChange(selectedOptions.filter(selected => selected !== option))
        } else {
            onChange([...selectedOptions, option])
        }
    }

    const hiddenCheckboxStyle: React.CSSProperties = {
        opacity: 0,
        position: 'absolute',
        left: '-9999px',
    }

    const customCheckboxStyle = (isChecked: boolean) => ({
        display: 'inline-block',
        width: '16px',
        height: '16px',
        borderRadius: '3px',
        transition: 'all 150ms',
        cursor: 'pointer',
        backgroundColor: isChecked ? '#facc15' : 'transparent',
        border: '1px solid #3e3e3e',
    })

    return (
        <div className="w-full bg-transparent border-none shadow-md outline-none p-2 rounded-md">
            <h1 className='text-gray-400 text-left py-2'>{placeholder}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
                {optionsArr.map((option, i) => (
                    <div
                        key={i}
                        className={'p-2 rounded flex items-center space-x-2 cursor-pointer'}
                    >
                        <input
                            type="checkbox"
                            checked={selectedOptions.includes(option)}
                            onChange={() => handleCheckboxChange(option)}
                            style={hiddenCheckboxStyle}
                            id={`custom-checkbox-${i}`}
                        />
                        <label htmlFor={`custom-checkbox-${i}`} className="flex items-center space-x-2 cursor-pointer">
                            <span style={customCheckboxStyle(selectedOptions.includes(option))}></span>
                            <span>{option}</span>
                        </label>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default CheckboxFormField