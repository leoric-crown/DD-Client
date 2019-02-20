import React, { Component } from 'react'
import { connect } from 'react-redux'
import { MDBContainer, MDBCol } from 'mdbreact';
import EncounterSelect from '../encounters/EncounterSelect'
import InitiativeRow from './InitiativeRow'

class TurnTracker extends Component {
    constructor(props) {
        super(props)
        const encounter = this.props.Encounters && this.props.Encounters.list && this.props.Encounters.list.length > 0 ? this.props.Encounters.list[0]._id : false
        this.state = {
            encounter,
            activeTurn: null
        }
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
                                    <EncounterSelect 
                                        encounters={this.props.Encounters.list}
                                        value={this.state.encounter}
                                        onChange={this.setEncounter}
                                    />
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