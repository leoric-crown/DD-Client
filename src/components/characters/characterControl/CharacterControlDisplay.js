import React from 'react'
import { FaShieldAlt, FaUserShield } from 'react-icons/fa'

const CharacterControlDisplay = (props) => {

    const { character } = props
    const { armorclass, level } = character
    return (
        <React.Fragment>
            {
                props.form ? (
                    <div className="text-center">
                        <div title="Armor Class" className="character-control-stat-icon">
                            <FaShieldAlt test color="darkred" />
                            <div>{armorclass}</div>
                        </div>
                        <div title="Level" className="character-control-stat-icon">
                            <FaUserShield test color="darkred" />
                            <div>{level}</div>
                        </div>
                    </div>
                ) : (
                    <div className="character-control-display" onClick={props.onClick}>
                        <div title="Armor Class" className="character-control-stat-icon">
                            <FaShieldAlt test color="darkred" />
                            <div>{armorclass}</div>
                        </div>
                        <div title="Level" className="character-control-stat-icon" onClick={props.onClick}>
                            <FaUserShield test color="darkred" />
                            <div>{level}</div>
                        </div>
                    </div>
                    )
            }
        </React.Fragment>


    )
}

export default CharacterControlDisplay