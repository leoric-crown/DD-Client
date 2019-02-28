import React from 'react'
import Select from 'react-select'
import { FaShieldAlt } from 'react-icons/fa'

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
    return { value: value, label: `AC ${value}` }
}

const selectOptions = (() => {
    const maxAC = 40
    const acList = Array.from(Array(maxAC).keys())

    const acOptions = acList.map(ac => {
        return getValueOption(ac+1)
    })
    acOptions.unshift(({ value: false, label: 'Select Armor Class', disabled: true}))
    return acOptions
})()



const characterAcSelect = (props) => {
    return (
        <div >
            {<span className="d-flex justify-content-space-evenly">
                <FaShieldAlt size="2rem" color="darkred"/>
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

export default characterAcSelect