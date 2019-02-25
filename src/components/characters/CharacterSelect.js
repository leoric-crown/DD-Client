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

const defaultOption = { value: false, label: 'No Valid Characters', character: false }

const getValueOption = (props) => {
    if (props.value) {
        const character = props.value
        return { value: character._id, label: character.name, character }
    }
    return defaultOption
}

const getSelectOptions = (props) => {
    const options = []
    const list = props.characters
    list.forEach(character => {
        options.push({ value: character._id, label: character.name, character })
    })
    if (options.length === 0) options.push(defaultOption)
    return options
}

const characterSelect = (props) => {
    return (
        <div>
            {props.characters &&
                (
                    <div>
                        <label className="select-label">Character</label>
                        <Select
                            value={getValueOption(props)}
                            onChange={e => props.onChange(e.character)}
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

export default characterSelect