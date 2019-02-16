import React, { Component } from 'react'
import { connect } from 'react-redux'
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon } from 'mdbreact';

class TurnTracker extends Component {
    state = {
        encounter: null,
        activeTurn: null,
        encounterOptions: false
    }
   
    render() {       
        return (
            <div>
                {
                this.props.Initiatives.list && (
                <MDBContainer className="d-flex justify-content-center">
                    <MDBCol md="10">
                        {this.props.Initiatives.list.map(initiative => {
                            return (
                                <div key={initiative._id} className="initiatives-container">
                                    <div className="initiative-element"> Roll: {initiative.initiative} </div>
                                    <div className='initiative-column'>
                                        <img alt="character pic" className="rounded-circle z-depth-0 initiative-pic" src={`http://localhost:5000/${initiative.characterStamp['picUrl']}`} />
                                        <div> {initiative.characterStamp.name} </div>
                                    </div>
                                    <div className='initiative-column'>
                                        <div> AC: {initiative.characterStamp.armorclass} </div>
                                    </div>
                                    <div className='initiative-column'>
                                        <div> HP: {initiative.characterStamp.hitpoints} </div>
                                        <div> Max HP: {initiative.characterStamp.maxhitpoints} </div>
                                    </div>
                                </div>
                            )
                        })}
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