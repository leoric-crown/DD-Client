import React from 'react'

const handleChange = (value, onChange) => {
    onChange(value)
}

const getOptions = (props) => {
    const { characters } = props
    let characterList = characters
    const characterOptions = characterList.map((character) => (
        <option key={character._id} value={character._id} player={character.player ? "true" : "false"}>{character.name}</option>
    ))
    characterOptions.unshift(
        characterOptions.length > 0 ?
            <option key='default' value='' player='false' disabled>Select Character...</option> :
            <option key='invalid' value='' player='false' disabled>No valid Characters! </option>
    )
    return characterOptions
}
const NewCharacterSelect = (props) => {
    return (
        <div>
            {
                props.characters && (
                    <div>
                        <label className="select-label">Character</label>
                        <select
                            className="browser-default custom-select"
                            id="Character"
                            onChange={e => handleChange(e.target.value, props.onChange)}
                            value={props.value}>
                            {getOptions(props)}
                        </select>
                    </div>
                )
            }
        </div>
    )
}

export default NewCharacterSelect