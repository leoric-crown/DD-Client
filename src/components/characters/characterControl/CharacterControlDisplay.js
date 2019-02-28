import React from 'react'
import { FaShieldAlt } from 'react-icons/fa'

const CharacterControlDisplay = (props) => {
    
    const { character } = props
    const { armorclass } = character
    return (
        <React.Fragment>
            {
                props.form ? (
                    <div className="text-center">
                        <div title="Armor Class">
                            <FaShieldAlt className='stats-icons' />
                            <div>{armorclass}</div>
                        </div>
                    </div>
                ) : (
                        <div className="character-control-display">
                            <div title="Armor Class" className="stat-with-icon" onClick={props.onClick}>
                                <FaShieldAlt className='stats-icons' />
                                <div>{armorclass}</div>
                            </div>
                        </div>
                    )
            }
        </React.Fragment>


    )
}

export default CharacterControlDisplay