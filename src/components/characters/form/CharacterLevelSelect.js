import React from 'react'
import Select from 'react-select'
import { FaUserShield } from 'react-icons/fa'

const selectStyles = {
    control: styles => ({ ...styles }),
    option: (styles, { isDisabled }) => {
        return {
            ...styles,
            backgroundColor: 'white',
            color: isDisabled ? 'gray' : 'black',
            cursor: isDisabled ? 'not-allowed' : 'default'
        }
    }
}

const getValueOption = (value) => {
    return { value: value, label: `Level ${value}` }
}

const selectOptions = (() => {
    const numLevels = 20
    const levels = Array.from(Array(numLevels).keys())

    const levelOptions = levels.map(level => {
        return getValueOption(level + 1)
    })
    levelOptions.unshift(({ value: false, label: 'Select Level', disabled: true }))
    return levelOptions
})()



const characterLevelSelect = (props) => {
    return (
        <div>
            {<span className="d-flex justify-content-space-evenly">
                <FaUserShield size="2rem" color="darkred"/>
                <div style={{ width: '100%' }}>
                    <Select
                        value={getValueOption(props.value)}
                        onChange={e => props.onChange(e.value)}
                        options={selectOptions}
                        isOptionDisabled={option => option.disabled}
                        isSearchable={true}
                        styles={selectStyles}
                    />
                </div>
            </span>
            }
        </div>
    )
}

export default characterLevelSelect