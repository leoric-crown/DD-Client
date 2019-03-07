import React from 'react'
import { FaShieldAlt, FaUserShield } from 'react-icons/fa'

const CharacterControlDisplay = (props) => {
    const { character, user } = props
    const { armorclass, level } = character
    const canEdit = user && (user.isDM || character.user === user._id)
    const canView = user && (user.isDM || character.player)
    return (
        <React.Fragment>
            {
                props.form ? (
                    <div className="text-center">
                        <div title="Armor Class" className="character-control-stat-icon">
                            <FaShieldAlt color="darkred" />
                            <div>{armorclass}</div>
                        </div>
                        <div title="Level" className="character-control-stat-icon">
                            <FaUserShield color="darkred" />
                            <div>{level}</div>
                        </div>
                    </div>
                ) : (
                    <div className="character-control-display" onClick={canEdit ? props.onClick : () => {}}>
                        <div style={{cursor: 'pointer'}} title="Armor Class" className="character-control-stat-icon">
                            <FaShieldAlt color="darkred" />
                            {canView && <div>{armorclass}</div>}
                        </div>
                        <div style={{cursor: 'pointer'}} title="Level" className="character-control-stat-icon" onClick={canEdit ? props.onClick : () => {}}>
                            <FaUserShield color="darkred" />
                            {canView && <div>{level}</div>}
                        </div>
                    </div>
                    )
            }
        </React.Fragment>


    )
}

export default CharacterControlDisplay