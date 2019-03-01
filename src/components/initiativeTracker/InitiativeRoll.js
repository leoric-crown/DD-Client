import React, { Component } from 'react'
import { FaDiceD20 } from 'react-icons/fa'
import { MDBContainer, MDBCol, MDBInput } from 'mdbreact'
import config from '../../config.json'
import MyMDBModal from '../modal/MDBModal';

class InitiativeRoll extends Component {
    constructor(props) {
        super(props)
        this.state = {
            updating: false,
            initiative: this.props.initiative.initiative,
            newInitiative: this.props.initiative.initiative
        }
    }

    cancelModal = () => {
        this.setState({
            updating: false
        })
    }

    openModal = () => {
        this.setState({
            updating: true
        })
    }

    handleChange = (newInitiative) => {
        newInitiative = parseInt(newInitiative)
        if (isNaN(newInitiative)) newInitiative = this.props.initiative.initiative
        this.setState({
            newInitiative
        })
    }

    handleSubmit = () => {
        const { newInitiative } = this.state
        this.setState({
            updating: false,
            initiative: newInitiative,
            newInitiative
        })
        if (newInitiative !== this.props.initiative.initiative) {
            this.props.onSubmit([
                { propName: 'initiative', value: newInitiative }
            ])
        } else this.props.onSubmit(false)
    }

    render() {
        const { characterStats } = this.props
        const { updating, initiative, newInitiative } = this.state
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
                                    <h2>{characterStats.name}</h2>
                                    <img className="card-pic rounded-circle z-depth-0 lg" alt='DnD Turn Tracker Logo' src={`${config.API}/${characterStats.picUrl}`} />
                                    <div title="Initiative Roll" onClick={this.openModal}>
                                        <FaDiceD20 test color="darkred" />
                                        <div>{initiative}</div>
                                    </div>
                                    {newInitiative !== initiative && (
                                        <div>
                                            <h3>New Roll</h3>
                                            <div title="New Initiative Roll">
                                                <FaDiceD20 test color="darkred" />
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
                                </div>
                            </MDBCol>
                        </MDBContainer>
                    </MyMDBModal>
                )}
                <div title="Initiative Roll" className="initiative-roll-display" onClick={this.openModal}>
                    <FaDiceD20 test color="darkred" size="2rem" />
                    <div style = {{paddingTop: '0.3rem'}}>{initiative}</div>
                </div>
            </React.Fragment>
        )
    }
}
export default InitiativeRoll
