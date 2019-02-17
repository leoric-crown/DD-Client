import React, { Component } from 'react'
import { connect } from 'react-redux'
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon } from 'mdbreact';
import EncounterSelect from '../encounters/EncounterSelect'

class TurnTracker extends Component {
    state = {
        encounter: null,
        activeTurn: null
    }

    setEncounter = (id) => {
        this.setState({
            encounter: id
        })
    }

    getProgressBarStyle = (percentage) => {
        return {
      width: `${percentage}%`
    }
    }
   
    render() {      
        console.log(this.state)
        return (
            <div>
                
                {
                (this.props.Initiatives.list) && (
                <MDBContainer className="d-flex justify-content-center">
                    <MDBCol md="10">
                        <div>
                            <EncounterSelect onChange={this.setEncounter}/>
                        </div>
                        {this.state.encounter && (
                            this.props.Initiatives.list.filter(initiative => {
                                return initiative.encounter === this.state.encounter
                            })
                            .map(initiative => {
                                return (
                                    <div key={initiative._id} className="initiatives-container">
                                        <div className="initiative-column"> {initiative.initiative} </div>
                                            <div className='initiative-column'>
                                                <img alt="character pic" className="rounded-circle z-depth-0 initiative-pic" src={`http://localhost:5000/${initiative.characterStamp['picUrl']}`} />
                                                <div> {initiative.characterStamp.name} </div>
                                            </div>
                                            <div className='initiative-column'>
                                                AC: {initiative.characterStamp.armorclass}
                                            </div>
                                            <div className='initiative-column'>
                                                <div className='hp-column'>
                                                    <div className="progress-bar-border">
                                                    <h6 className='initiative-column'>HP</h6>
                                                    <div style={this.getProgressBarStyle(100 * initiative.characterStamp.hitpoints / initiative.characterStamp.maxhitpoints)} className="progress-bar">
                                                        {`${initiative.characterStamp.hitpoints} / ${initiative.characterStamp.maxhitpoints}`}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        )}
                    </MDBCol>
                </MDBContainer>
                )
                } 
            </div>        
        )
    }
}


function mapStateToProps({ User, Encounters, Characters, Initiatives }) {
    return { 
        User,
        Encounters,
        Characters,
        Initiatives
    }
}

export default connect(mapStateToProps)(TurnTracker)