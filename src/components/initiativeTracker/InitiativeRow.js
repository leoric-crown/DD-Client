import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteInitiative } from '../../actions/initiatives'
import CharacterHitPoints from './characterHitpoints/CharacterHitpoints';
import config from '../../config.json'
import { patchCharacter } from '../../actions/characters'
import { patchInitiativeCharacter } from '../../actions/initiatives'
import { FaDiceD20, FaShieldAlt, FaRegTrashAlt } from 'react-icons/fa'

class InitiativeRow extends Component {
    constructor(props) {
        super(props)
        const { initiative, character } = this.props
        this.state = {
            character,
            initiative
        }
    }
    handleDelete(initiative) {
        this.props.dispatch(deleteInitiative(localStorage.getItem('DNDTOKEN'), initiative._id))
    }

    handleHpChange = (fieldsToUpdate) => {
        if (fieldsToUpdate) {
            const { character, initiative } = this.state
            if (character.player) {
                this.props.dispatch(
                    patchCharacter(localStorage.getItem('DNDTOKEN'), fieldsToUpdate, character.request.url)
                )
            }
            else {
                this.props.dispatch(
                    patchInitiativeCharacter(localStorage.getItem('DNDTOKEN'), fieldsToUpdate, initiative.characterStamp.request.url)
                )
            }

        }
    }

    render() {
        const { initiative, character } = this.state
        const characterStats = initiative.characterStamp.player ? character : initiative.characterStamp
        const { name, armorclass } = characterStats
        return (
            <div>
                {initiative && (
                    <div key={initiative._id} className="initiatives-container">
                        <div className='initiative-column' title={name}>
                            <img alt="character pic"
                                className="rounded-circle z-depth-0 initiative-pic"
                                src={`${config.API}/${initiative.characterStamp['picUrl']}`} />
                            <div className="character-name"> {name} </div>
                        </div>
                        <div className='stats-column' title="Character HP">
                            <CharacterHitPoints
                                {...{ characterStats }}
                                onClick={this.openModal}
                                dispatch={this.props.dispatch}
                                onSubmit={this.handleHpChange}
                            />
                            <div title="Initiative Roll"><FaDiceD20 className='stats-icons' onClick={() => { console.log('clicked dice') }} /> {initiative.initiative}</div>
                            <div title="Armor Class"> <FaShieldAlt className='stats-icons'/> {armorclass} </div>
                        </div>
                        <div className='initiative-actions'>
                            <span title="Delete/Remove"><FaRegTrashAlt style={{ cursor: 'pointer' }} onClick={() => this.handleDelete(initiative)} /></span>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default connect()(InitiativeRow)