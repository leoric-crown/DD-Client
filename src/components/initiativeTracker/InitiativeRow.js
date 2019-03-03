import React, { Component } from 'react'
import CharacterHitPoints from '../characters/hitPoints/CharacterHitpoints';
import CharacterControl from '../characters/characterControl/CharacterControl'
import InitiativeRoll from './InitiativeRoll'
import config from '../../config.json'
import { patchCharacter } from '../../redux/actions/characters'
import { deleteInitiative, patchInitiativeCharacter, getNextTurn, patchInitiative } from '../../redux/actions/initiatives'
import { FaRegTrashAlt } from 'react-icons/fa'

class InitiativeRow extends Component {
    handleDelete(initiative) {
        if (this.props.active && this.props.totalRows > 1) {
            this.props.dispatch(getNextTurn(localStorage.getItem('DNDTOKEN'),
                initiative.encounter,
                initiative._id,
                true))
        } else {
            this.props.dispatch(deleteInitiative(localStorage.getItem('DNDTOKEN'), initiative._id))
        }
    }

    handleCharacterUpdate = (fieldsToUpdate) => {
        if (fieldsToUpdate) {
            const { character, initiative } = this.props
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

    handleReRollInitiative = (fieldsToUpdate) => {
        if (fieldsToUpdate) {
            this.props.dispatch(
                patchInitiative(localStorage.getItem('DNDTOKEN'), fieldsToUpdate, this.props.initiative.request.url)
            )
        }
    }

    render() {
        const { initiative, character } = this.props
        const characterStats = initiative.characterStamp.player ? character : initiative.characterStamp
        const { name } = characterStats
        const style = {
            border: initiative.active ? '3px solid gold' : '',
            background: initiative.active ? 'lightgray' : ''
        }
        return (
            <div>
                {initiative && (
                    <div
                        key={initiative._id}
                        className="initiative-row-container"
                        style={style}
                        id={this.props.active ? 'active' : null}
                        ref={this.props.active ? 'activeTurn' : null}
                    >
                        <div title="Initiative Roll" className="initiative-row-roll">
                            <InitiativeRoll
                                {...{ characterStats }}
                                initiative={initiative}
                                onSubmit={this.handleReRollInitiative}
                            />
                        </div>
                        <div className='initiative-row-column' title={name}>
                            <img alt="character pic"
                                className="rounded-circle z-depth-0 initiative-row-pic"
                                src={`${config.API}/${initiative.characterStamp['picUrl']}`} />
                            <div className="initiative-row-name"> {name} </div>
                        </div>
                        <div className='initiative-row-character' title="Character HP">
                            <CharacterHitPoints
                                {...{ characterStats }}
                                onClick={this.openModal}
                                onSubmit={this.handleCharacterUpdate}
                            />
                            <CharacterControl
                                character={characterStats}
                                onSubmit={this.handleCharacterUpdate}
                            />
                        </div>
                        <div className='initiative-row-actions'>
                            <span title="Delete/Remove" onClick={() => this.handleDelete(initiative)}>
                                <FaRegTrashAlt style={{ cursor: 'pointer' }} />
                            </span>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default InitiativeRow