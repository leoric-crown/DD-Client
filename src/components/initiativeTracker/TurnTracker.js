import React, { Component } from 'react'
import { connect } from 'react-redux'
import { MDBContainer, MDBCol, MDBBtn } from 'mdbreact'
import EncounterSelect from '../encounters/EncounterSelect'
import InitiativeRow from './InitiativeRow'
import InitiativeForm from './InitiativeForm'

import { getNextTurn } from '../../redux/actions/initiatives'
import MyMDBModal from '../modal/MDBModal';

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

        const initiatives = this.props.Initiatives.list.filter(initiative => {
            return initiative.encounter === encounter._id
        }).sort((a, b) => b.initiative - a.initiative).sort((a, b) => a._id - b._id)
        const activeTurn = initiatives.find(i => i.active)
        this.state = {
            encounter,
            initiatives,
            activeTurn: activeTurn ? activeTurn : null,
            fixedEncounter
        }
    }

    componentDidMount() {
        this.refs.activeTurn.focus()
    }

    componentDidUpdate(prevProps, prevState) {
        const { newTurn } = this.props.Initiatives
        if ((newTurn && newTurn !== prevProps.Initiatives.newTurn)
            || this.state.encounter !== prevState.encounter) {
            this.refs.activeTurn.focus()
        }
        if (this.props.setEncounter !== prevProps.setEncounter) {
            this.setState({
                encounter: this.props.setEncounter ? this.props.setEncounter : this.props.Encounters.list[0],
                fixedEncounter: !this.state.fixedEncounter
            })
        }
        if (this.props.Initiatives.list !== prevProps.Initiatives.list && this.state.encounter) {
            const initiatives = this.props.Initiatives.list.filter(initiative => {
                return initiative.encounter === this.state.encounter._id
            }).sort((a, b) => b.initiative - a.initiative)
            const activeTurn = initiatives.find(i => i.active)
            this.setState({
                initiatives,
                activeTurn: activeTurn ? activeTurn : null
            })
        }
    }

    setEncounter = (encounter) => {
        const initiatives = this.props.Initiatives.list.filter(initiative => {
            return initiative.encounter === encounter._id
        }).sort((a, b) => b.initiative - a.initiative)
        const activeTurn = initiatives.find(i => i.active)
        this.setState({
            encounter,
            initiatives,
            activeTurn: activeTurn ? activeTurn : null
        })
    }

    nextTurn = () => {
        this.props.dispatch(
            getNextTurn(localStorage.getItem('DNDTOKEN'),
                this.state.encounter._id,
                this.state.activeTurn)
        )
    }

    toggleModal = () => {
        this.setState({
            modalOpen: !this.state.modalOpen
        })
    }

    render() {
        const InitiativeFormAttributes = {
            Initiatives: this.props.Initiatives,
            Encounters: this.props.Encounters,
            Characters: this.props.Characters,
            setEncounter: this.state.encounter,
            dispatch: this.props.dispatch
        }
        const { initiatives } = this.state
        return (
            <div>
                {
                    (initiatives) && (
                        <React.Fragment>
                            {this.state.modalOpen && (
                                <MyMDBModal
                                    toggle={this.toggleModal}
                                    isOpen={true}
                                    canConfirm={false}
                                    labels={{
                                        header: 'Initiative Roll',
                                        confirm: 'Insert Character'
                                    }}>
                                    <InitiativeForm {...InitiativeFormAttributes} />
                                </MyMDBModal>
                            )}
                            <MDBContainer className="d-flex justify-content-center">
                                <MDBCol md="10">
                                    <div className="initiatives-header">
                                        {
                                            this.state.fixedEncounter ? (
                                                <div>
                                                    <br />
                                                    <h4 className='text-center'>Active Encounter: {this.state.encounter.name}, {initiatives.length} Characters</h4>
                                                </div>
                                            ) : (
                                                    <div style={{ padding: '1rem' }}>
                                                        <EncounterSelect
                                                            encounters={this.props.Encounters.list}
                                                            value={this.state.encounter}
                                                            onChange={value => this.setEncounter(value)}
                                                            extra="trackerselect"
                                                        />
                                                    </div>
                                                )
                                        }
                                        <div className="d-flex justify-content-center">
                                            <div className='d-flex justify-content-center'>
                                                {
                                                    initiatives.length > 1 && (
                                                        <MDBBtn
                                                            type="button"
                                                            color="black"
                                                            onClick={() => this.nextTurn()}
                                                        >
                                                            {!this.state.activeTurn ? 'Start Encounter' : 'Next Turn'}
                                                        </MDBBtn>
                                                    )
                                                }
                                                <MDBBtn
                                                    type="button"
                                                    color="black"
                                                    onClick={this.toggleModal}
                                                >
                                                    Add Characters
                                                        </MDBBtn>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="initiatives-table">
                                        {this.state.encounter && initiatives && (
                                            initiatives.map(initiative => {
                                                return (
                                                    <div
                                                        tabIndex={initiative.active ? '1' : null}
                                                        key={initiative._id}
                                                        ref={initiative.active ? 'activeTurn' : null}
                                                    >
                                                        <InitiativeRow
                                                            active={initiative.active}
                                                            key={initiative._id}
                                                            initiative={initiative}
                                                            character={this.props.Characters.list.find(c => c._id === initiative.characterStamp._id)}
                                                        />
                                                    </div>
                                                )
                                            })
                                        )}
                                    </div>
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