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

const defaultOption = { value: false, label: 'No Valid Encounters', encounter: false }

const getOptionFromId = (list, id) => {
    const encounter = list.find(e => e._id === id)
    return { value: id, label: encounter.name, encounter }
}

const getSelectOptions = (props) => {
    const options = []
    const list = props.encounters
    list.forEach(encounter => {
        options.push({ value: encounter._id, label: encounter.name, encounter })
    })
    if (options.length === 0) options.push(defaultOption)
    return options
}

const handleChange = (e, props) => {
    props.onChange(e.encounter)
}

const EncounterSelect = (props) => {    
    return (
        <div>
            {props.encounters &&
                (
                    <div>
                        <label className="select-label">Encounter</label>
                        <Select
                            value={props.value ? getOptionFromId(props.encounters, props.value._id) : defaultOption}
                            onChange={e => handleChange(e, props)}
                            options={getSelectOptions(props)}
                            isSearchable={true}
                            isDisabled={props.isDisabled}
                            styles={selectStyles}
                        />
                    </div>
                )
            }
        </div>
    )
}

export default EncounterSelect