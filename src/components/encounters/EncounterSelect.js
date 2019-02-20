import React from 'react'
import Select from 'react-select'

const selectStyles = {
    control: styles => ({ ...styles }),
    option: (styles, { isDisabled }) => {
        return {
            ...styles,
            backgroundColor: 'white',
            color: 'black',
            cursor: isDisabled ? 'not-allowed' : 'default'
        }
    }
}

const defaultOption = { value: false, label: 'No Valid Encounters' }

const getOptionFromId = (list, id) => {
    return { value: id, label: list.find(c => c._id === id).name }
}

const getSelectOptions = (props) => {
    const options = []
    const list = props.encounters
    list.forEach(encounter => {
        options.push({ value: encounter._id, label: encounter.name })
    })
    if (options.length === 0) options.push(defaultOption)
    return options
}

const EncounterSelect = (props) => {
    return (
        <div>
            {props.encounters &&
                (
                    <div>
                        <label className="select-label">Encounter</label>
                        <Select
                            value={props.value ? getOptionFromId(props.encounters, props.value) : defaultOption}
                            onChange={e => props.onChange(e.value)}
                            options={getSelectOptions(props)}
                            isSearchable={true}
                            styles={selectStyles}
                        />
                    </div>
                )
            }
        </div>
    )
}

export default EncounterSelect