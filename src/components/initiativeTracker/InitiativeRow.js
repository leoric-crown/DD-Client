import React, { Component } from 'react'
import { connect } from 'react-redux'
import { MDBIcon } from 'mdbreact';
import { deleteInitiative } from '../../actions/initiatives'
import CharacterHitPoints from './characterHitpoints/CharacterHitpoints';
import config from '../../config.json'

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

    render() {
        const { initiative, character } = this.props
        const characterStats = initiative.characterStamp.player ? character : initiative.characterStamp
        const { name, armorclass, player } = characterStats
        return (
            <div>
                {initiative && (
                    <div key={initiative._id} className="initiatives-container">
                        <div className="initiative-column"> Roll: {initiative.initiative} </div>
                        <div className='initiative-column'>
                            <img alt="character pic"
                                className="rounded-circle z-depth-0 initiative-pic"
                                src={`${config.API}/${initiative.characterStamp['picUrl']}`} />
                            <div> {name} </div>
                        </div>
                        <div className='initiative-column'>
                            AC: {armorclass}
                        </div>
                        <div className='initiative-column'>
                            <CharacterHitPoints
                                {...{ characterStats }}
                                onClick={this.openModal}
                                dispatch={this.props.dispatch} />
                        </div>
                        <div className='initiative-column'>
                            Player: {player ? 'Yes' : 'No'}
                        </div>
                        <div className='initiative-column'>
                            <MDBIcon
                                style={{ cursor: 'pointer' }}
                                onClick={() => this.handleDelete(initiative)}
                                icon="trash" />
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default connect()(InitiativeRow)