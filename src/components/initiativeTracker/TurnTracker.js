import React, { Component } from 'react'
import { connect } from 'react-redux'
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon } from 'mdbreact';
import EncounterSelect from '../encounters/EncounterSelect'
import InitiativeRow from './InitiativeRow'

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

    render() {
        return (
            <div>
                {
                    (this.props.Initiatives.list) && (
                        <MDBContainer className="d-flex justify-content-center">
                            <MDBCol md="10">
                                <div>
                                    <EncounterSelect onChange={this.setEncounter} />
                                </div>
                                {this.state.encounter && this.props.Initiatives.list && (
                                    this.props.Initiatives.list.filter(initiative => {
                                        return initiative.encounter === this.state.encounter
                                    }).sort((a, b) => b.initiative - a.initiative).map(initiative => {
                                        return (
                                            <InitiativeRow key={initiative._id} initiative={initiative} />
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