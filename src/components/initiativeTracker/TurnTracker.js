import React, { Component } from 'react'
import { connect } from 'react-redux'
import { MDBContainer, MDBCol } from 'mdbreact';
import EncounterSelect from '../encounters/EncounterSelect'
import InitiativeRow from './InitiativeRow'

class TurnTracker extends Component {
    constructor(props) {
        super(props)
        let encounter = false
        let fixedEncounter = false
        if (this.props.setEncounter) {
            encounter = this.props.setEncounter
            fixedEncounter = true
        } else if (this.props.Encounters.list && this.props.Encounters.list.length > 0) {
            encounter = this.props.Encounters.list[0]
        }

        this.state = {
            encounter,
            activeTurn: null,
            fixedEncounter
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.setEncounter !== prevProps.setEncounter) {
            this.setState({
                encounter: this.props.setEncounter ? this.props.setEncounter : this.props.Encounters.list[0],
                fixedEncounter: !this.state.fixedEncounter
            })
        }
        if (this.props.Characters.list !== prevProps.Characters.list) console.log('CHANGE')
    }

    setEncounter = (encounter) => {
        this.setState({
            encounter
        })
    }

    render() {
        let initiativeList = false
        if (this.props.Initiatives.list) {
            initiativeList = this.props.Initiatives.list.filter(initiative => {
                return initiative.encounter === this.state.encounter._id
            })
        }
        return (
            <div>
                {
                    (initiativeList) && (
                        <React.Fragment>
                            <MDBContainer className="d-flex justify-content-center">
                                <MDBCol md="10">
                                    <div>
                                        {
                                            this.state.fixedEncounter ? (
                                                <div>
                                                    <br />
                                                    <h4 className='text-center'>Active Encounter: {this.state.encounter.name}, {initiativeList.length} Characters</h4>
                                                </div>
                                            ) : (
                                                    <EncounterSelect
                                                        encounters={this.props.Encounters.list}
                                                        value={this.state.encounter}
                                                        onChange={value => this.setEncounter(value)}
                                                        extra="trackerselect"
                                                    />
                                                )
                                        }
                                    </div>
                                    {this.state.encounter && this.props.Initiatives.list && (
                                        initiativeList.sort((a, b) => b.initiative - a.initiative).map(initiative => {
                                            return (
                                                <InitiativeRow
                                                    key={initiative._id}
                                                    initiative={initiative}
                                                    character={this.props.Characters.list.find(c => c._id === initiative.characterStamp._id)}
                                                />
                                            )
                                        })
                                    )}
                                </MDBCol>
                            </MDBContainer>
                        </React.Fragment>
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