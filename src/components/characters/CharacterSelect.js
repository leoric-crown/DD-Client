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

const defaultOption = { value: false, label: 'No Valid Characters' }

const getOptionFromId = (list, id) => {
    return { value: id, label: list.find(c => c._id === id).name }
}

const getSelectOptions = (props) => {
    const options = []
    const list = props.characters
    list.forEach(character => {
        options.push({ value: character._id, label: character.name })
    })
    if (options.length === 0) options.push(defaultOption)
    return options
}

const CharacterSelect = (props) => {
    return (
        <div>
            {props.characters &&
                (
                    <div>
                        <label className="select-label">Character</label>
                        <Select
                            value={props.value ? getOptionFromId(props.characters, props.value) : defaultOption}
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

export default CharacterSelect