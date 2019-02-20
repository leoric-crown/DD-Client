// import React from 'react'

// const handleChange = (value, onChange) => {
//     onChange(value)
// }

// const getOptions = (props) => {
//     const { encounters } = props
//     let encounterList = encounters
//     const encounterOptions = encounterList.map((encounter) => (
//         <option key={encounter._id} value={encounter._id} player={encounter.player ? "true" : "false"}>{encounter.name}</option>
//     ))
//     encounterOptions.unshift(defaultValue(props))
//     return encounterOptions
// }

// const defaultValue = (props) => {
//     const { encounters } = props
//     return encounters.length > 0 ?
//         <option key='default' value={false} player='false' disabled>Select Encounter...</option> :
//         <option key='invalid' value={false} player='false'>No valid Encounters! </option>
// }

// const EncounterSelect = (props) => {
//     return (
//         <div>
//             {
//                 props.encounters && (
//                     <div>
//                         <label className="select-label">Encounter</label>
//                         <select
//                             className="browser-default custom-select"
//                             id="Encounter"
//                             onChange={e => handleChange(e.target.value, props.onChange)}
//                             defaultValue={defaultValue(props)}>
//                             {getOptions(props)}
//                         </select>
//                     </div>
//                 )
//             }
//         </div>
//     )
// }

// export default EncounterSelect

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