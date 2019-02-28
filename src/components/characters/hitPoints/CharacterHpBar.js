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
        <div className='hp-column' onClick={props.onClick}>
            <div className='progress-bar-hitpoints'>
                <FaHeartbeat className='progress-bar-heartbeat' /> {`${props.hitpoints} / ${props.maxhitpoints}`}
            </div>
            <div className="progress-bar-container">
                <div className="progress-bar-background">
                    <div style={getProgressBarStyle(100 * props.hitpoints / props.maxhitpoints)} className="progress-bar"></div>
                </div>

            </div>
        </div>
    )
}

export default CharacterHpBar