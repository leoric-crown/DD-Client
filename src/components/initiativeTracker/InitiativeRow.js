import React, { Component } from 'react'
import { connect } from 'react-redux'
import CharacterHitPoints from './characterHitpoints/CharacterHitpoints';
import config from '../../config.json'
import { patchCharacter } from '../../redux/actions/characters'
import { deleteInitiative, patchInitiativeCharacter, getNextTurn } from '../../redux/actions/initiatives'
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
        if (this.props.active) {
            this.props.dispatch(getNextTurn(localStorage.getItem('DNDTOKEN'),
                initiative.encounter,
                initiative._id,
                true))
        } else {
            this.props.dispatch(deleteInitiative(localStorage.getItem('DNDTOKEN'), initiative._id))
        }
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
        const style = {
            border: initiative.active ? '3px solid gold' : '',
            background: initiative.active ? 'lightgray' : ''
        }
        return (
            <div>
                {initiative && (
                    <div
                        key={initiative._id}
                        className="initiatives-container"
                        style={style}
                        id={this.props.active ? 'active' : null}
                        ref={this.props.active ? 'activeTurn' : null}
                    >
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
                            <div title="Initiative Roll"><FaDiceD20 className='stats-icons' /> {initiative.initiative}</div>
                            <div title="Armor Class"> <FaShieldAlt className='stats-icons' /> {armorclass} </div>
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