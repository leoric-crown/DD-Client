import React from 'react'

const handleChange = (value, onChange) => {
    onChange(value)
}

const getOptions = (props) => {
    const { encounters } = props
    let encounterList = encounters
    const encounterOptions = encounterList.map((encounter) => (
        <option key={encounter._id} value={encounter._id} player={encounter.player ? "true" : "false"}>{encounter.name}</option>
    ))
    encounterOptions.unshift(defaultValue(props))
    return encounterOptions
}

const defaultValue = (props) => {
    const { encounters } = props
    return encounters.length > 0 ?
        <option key='default' value={false} player='false' disabled>Select Encounter...</option> :
        <option key='invalid' value={false} player='false'>No valid Encounters! </option>
}

const EncounterSelect = (props) => {
    return (
        <div>
            {
                props.encounters && (
                    <div>
                        <label className="select-label">Encounter</label>
                        <select
                            className="browser-default custom-select"
                            id="Encounter"
                            onChange={e => handleChange(e.target.value, props.onChange)}
                            defaultValue={defaultValue(props)}>
                            {getOptions(props)}
                        </select>
                    </div>
                )
            }
        </div>
    )
}

export default EncounterSelect