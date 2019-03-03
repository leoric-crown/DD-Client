import React from 'react'
import { FaHeartbeat } from 'react-icons/fa'
import gradient from 'gradient-color'

const getProgressBarStyle = (percentage) => {
    if (percentage > 100) percentage = 100
    const colors = gradient([
        '#930002',
        '#E0C600',
        '#009607'
    ], 10)
    return {
        width: `${percentage}%`,
        backgroundColor: colors[Math.floor(((percentage - 0.001) / 10) % 10)]
    }
}

const CharacterHpBar = props => {
    return (
        <div className='hp-bar' onClick={props.onClick}>
            <div className='hp-bar-text'>
                <FaHeartbeat className='hp-bar-hitpoints-icon' /> {`${props.hitpoints} / ${props.maxhitpoints}`}
            </div>
            <div className="hp-bar-background">
                <div className="hp-bar-background-color">
                    <div style={getProgressBarStyle(100 * props.hitpoints / props.maxhitpoints)} className="hp-bar-hitpoints"></div>
                </div>

            </div>
        </div>
    )
}

export default CharacterHpBar