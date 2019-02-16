import React, { Component } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon } from 'mdbreact';
import { createInitiative } from '../../actions/initiatives'

class InitiativeForm extends Component {
    state = {
        encounter: '',
        character: '',
        initiative: '',
        encounterOptions: false,
        characterOptions: false
    }

    encounterOptions() {
        const { encounters } = this.props
        if (encounters && encounters.list.length > 0) {
            return encounters.list.map(encounter => {
                return (
                    <option key={encounter._id} value={encounter._id}>{encounter.name}</option>
                )
            })
        }
        return []
    }

    characterOptions() {
        const { characters } = this.props
        if (characters && characters.list.length > 0) {
            return characters.list.map(character => {
                return (
                    <option key={character._id} value={character._id}>{character.name}</option>
                )
            })
        }
        return []
    }
    
    checkSelectOptions() {
        if (this.props.encounters.list && !this.state.encounterOptions) {
            const encounterOptions = this.encounterOptions()
            this.setState({
                encounterOptions,
                encounter: encounterOptions[0].props.value
            })
        }
        if (this.props.characters.list && !this.state.characterOptions) {
            const characterOptions = this.characterOptions()
            this.setState({
                characterOptions,
                character: characterOptions[0].props.value
            })
        }
    }

    componentWillReceiveProps() {
        this.checkSelectOptions()
    }

    componentDidMount() {
        this.checkSelectOptions()
    }

    handleKeyDown = (event) => {
        switch (event.key) {
            case 'Enter':
                this.handleSubmit(this.props.toggleButtonNavigation)
                break
            case 'Escape':
                this.handleCancel()
                break
            default:
                break
        }
    }

    handleChange = (type, value) => {
        switch (type) {
            case 'encounter':
                this.setState({
                    encounter: value
                })
                break
            case 'character':
                this.setState({
                    character: value
                })
                break
            case 'initiative':
                this.setState({
                    initiative: value
                })
                break
            default:
                return
        }
    }

    handleCreate() {
        const { initiative, encounter, character } = this.state
        const payload = {
            initiative,
            encounter,
            character
        }

        this.props.dispatch(createInitiative(localStorage.getItem('DNDTOKEN'), payload))
    }

    validateInput() {
        //TODO
    }

    handleSubmit() {
        this.handleCreate()
    }

    render() {
        return (
            <MDBContainer style={this.state.style}>
                <MDBRow className="d-flex justify-content-center">
                    <MDBCol md="8">
                        <MDBCard className="create-character">
                            <MDBCardBody className="mx-4 d-row" >
                                <div className="text-center">
                                    <h3 className="mb-5">
                                        <strong style={formHeaderStyle}>
                                            &nbsp;{this.state.updating ? `Edit ${this.state.updating.name}`
                                                :
                                                <MDBIcon className="black-text" icon='users' size='4x' />}
                                        </strong>
                                    </h3>
                                </div>
                                <MDBIcon icon="khanda" />
                                <MDBInput
                                    label="Initiative"
                                    containerClass="mb-0"
                                    required={true}
                                    onChange={(e) => this.handleChange("initiative", e.target.value)}
                                    onKeyDown={(e) => this.handleKeyDown(e)}
                                    value={this.state.initiative}
                                />
                                <label className="select-label">Encounter</label>
                                <select
                                    className="browser-default custom-select"
                                    id="Encounter"
                                    value={this.state.encounter}
                                    onChange={e => this.handleChange('encounter', e.target.value)}>
                                    {this.state.encounterOptions}
                                </select>
                                <br />
                                <label className="select-label">Character</label>
                                <select
                                    className="browser-default custom-select"
                                    id="Character"
                                    value={this.state.character}
                                    onChange={e => this.handleChange('character', e.target.value)}>
                                    {this.state.characterOptions}
                                </select>
                                <br/>
                                <br/>
                                <div className="text-center">
                                    <MDBBtn
                                        type="button"
                                        rounded
                                        color="black"
                                        className="btn-block z-depth-1a"
                                        onClick={() => this.handleSubmit()}
                                    >
                                        Create
                                    </MDBBtn>
                                </div>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>

            </MDBContainer>
        )
    }
}

const formHeaderStyle = {
    color: 'black'
}


export default InitiativeForm