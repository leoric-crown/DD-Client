import React, { Component } from 'react'
import { FaDiceD20 } from 'react-icons/fa'
import { MDBContainer, MDBCol, MDBInput, MDBAlert, MDBIcon } from 'mdbreact'
import config from '../../config.json'
import MyMDBModal from '../modal/MDBModal';
import { validateAll } from 'indicative'

class InitiativeRoll extends Component {
    constructor(props) {
        super(props)
        this.state = {
            updating: false,
            newInitiative: this.props.initiative.initiative,
            errors: {}
        }
    }

    cancelModal = () => {
        this.setState({
            updating: false,
            newInitiative: this.props.initiative.initiative
        })
    }

    openModal = () => {
        this.setState({
            updating: true,
            newInitiative: this.props.initiative.initiative
        })
    }

    handleChange = (newInitiative) => {
        this.setState({
            newInitiative
        })
    }

    handleSubmit = () => {
        const { newInitiative } = this.state

        const rules = {
            newInitiative: 'number'
        }
        const messages = {
            number: 'Please input a number value'
        }

        validateAll({ newInitiative }, rules, messages)
            .then(() => {
                this.setState({
                    updating: false
                })
                if (newInitiative !== this.props.initiative.initiative) {
                    this.props.onSubmit([
                        { propName: 'initiative', value: newInitiative }
                    ])
                } else this.props.onSubmit(false)
            })
            .catch(errors => {
                const formattedErrors = {}
                errors.forEach(error => (formattedErrors[error.field] = error.message))
                this.setState({
                    newInitiative: this.props.initiative.initiative,
                    errors: formattedErrors
                })
                return
            })
    }

    render() {
        const { character, user } = this.props
        const { updating, newInitiative } = this.state
        const { initiative } = this.props.initiative
        const canEdit = user && (user.isDM || character.user === user._id)
        const canView = user && (user.isDM || character.player )
        return (
            <React.Fragment>
                {updating && (
                    <MyMDBModal
                        toggle={this.cancelModal}
                        isOpen={this.state.updating}
                        canConfirm
                        onConfirm={this.handleSubmit}
                        fullHeight
                        centered
                        position="left"
                        backdrop={false}
                        labels={{
                            header: 'Re-roll Initiative',
                            confirm: 'Save Changes'
                        }}
                    >
                        <MDBContainer className="d-flex justify-content-center">
                            <MDBCol md="8">
                                <div className="text-center">
                                    <h2>{character.name}</h2>
                                    <img className="card-pic rounded-circle z-depth-0 lg" alt='DnD Turn Tracker Logo' src={`${config.API}/${character.picUrl}`} />
                                    <div title="Initiative Roll" onClick={this.openModal}>
                                        <FaDiceD20 color="darkred" />
                                        <div>{initiative}</div>
                                    </div>
                                    {newInitiative !== initiative && (
                                        <div style={{cursor: 'pointer'}}>
                                            <h3>New Roll</h3>
                                            <div title="New Initiative Roll">
                                                <FaDiceD20 color="darkred" />
                                                <div>{newInitiative}</div>
                                            </div>
                                        </div>
                                    )}
                                    <MDBInput
                                        className="text-center"
                                        label="Re-roll"
                                        containerClass="mb-0"
                                        onChange={e => this.handleChange(e.target.value)}
                                        value={newInitiative.toString()}
                                    />
                                    {this.state.errors.newInitiative && (
                                        <MDBAlert color='danger'>
                                            <MDBIcon icon='warning' />
                                            &nbsp;&nbsp;&nbsp;{this.state.errors.newInitiative}
                                        </MDBAlert>
                                    )}
                                </div>
                            </MDBCol>
                        </MDBContainer>
                    </MyMDBModal>
                )}
                <div style={{cursor: 'pointer'}} title="Initiative Roll" className="initiative-roll-display" onClick={canEdit ? this.openModal : () => {}}>
                    <FaDiceD20 color="darkred" size="2rem" />
                    { canView && <div style={{ paddingTop: '0.3rem' }}>{initiative}</div>}
                </div>
            </React.Fragment>
        )
    }
}
export default InitiativeRoll
