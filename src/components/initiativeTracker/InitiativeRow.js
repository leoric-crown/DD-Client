import React, { Component } from 'react'
import { connect } from 'react-redux'
import { MDBIcon } from 'mdbreact';
import { startEditInitiative, deleteInitiative } from '../../actions/initiatives'

class InitiativeRow extends Component {
    getProgressBarStyle = (percentage) => {
        return {
            width: `${percentage}%`
        }
    }

    handleEdit = (initiative) => {
        this.props.dispatch(startEditInitiative(initiative))
    }

    handleDelete(initiative) {
        this.props.dispatch(deleteInitiative(localStorage.getItem('DNDTOKEN'), initiative._id))
    }

    render() {
        const { initiative } = this.props
        const characterStats = initiative.characterStamp
        const { name, armorclass, hitpoints, maxhitpoints, player } = characterStats
        return (
            <div>
                {initiative && (
                    <div key={initiative._id} className="initiatives-container">
                        <div className="initiative-column"> Roll: {initiative.initiative} </div>
                        <div className='initiative-column'>
                            <img alt="character pic" className="rounded-circle z-depth-0 initiative-pic" src={`http://localhost:5000/${initiative.characterStamp['picUrl']}`} />
                            <div> {name} </div>
                        </div>
                        <div className='initiative-column'>
                            AC: {armorclass}    
                        </div>
                        <div className='initiative-column'>
                            <div className='hp-column'>
                                <div className="progress-bar-border">
                                    <div className='text-center'>HP</div>
                                    <div style={this.getProgressBarStyle(100 * hitpoints / maxhitpoints)} className="progress-bar">
                                        {`${hitpoints} / ${maxhitpoints}`}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='initiative-column'>
                            Player: {player ? 'Yes' : 'No'}
                        </div>
                        <div className='initiative-column'>
                            <MDBIcon style={{ cursor: 'pointer' }} onClick={() => this.handleDelete(initiative)} icon="trash" />
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default connect()(InitiativeRow)