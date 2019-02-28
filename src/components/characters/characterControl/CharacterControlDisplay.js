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
                        <div title="Armor Class">
                            <FaShieldAlt className='stats-icons' />
                            <div>{armorclass}</div>
                        </div>
                        <div title="Level" className="stat-with-icon">
                            <FaUserShield className='stats-icons' />
                            <div>{level}</div>
                        </div>
                    </div>
                ) : (
                        <div className="character-control-display" onClick={props.onClick}>
                            <div title="Armor Class" className="stat-with-icon">
                                <FaShieldAlt className='stats-icons' />
                                <div>{armorclass}</div>
                            </div>
                            <div title="Level" className="stat-with-icon" onClick={props.onClick}>
                                <FaUserShield className='stats-icons' />
                                <div>{level}</div>
                            </div>
                        </div>
                    )
            }
        </React.Fragment>


    )
}

export default CharacterControlDisplay