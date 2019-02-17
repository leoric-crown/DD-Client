import React, { Component } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon } from 'mdbreact';
import { createInitiative } from '../../actions/initiatives'
import EncounterSelect from '../encounters/EncounterSelect'

class InitiativeForm extends Component {
    state = {
        encounter: '',
        character: '',
        initiative: '',
        encounterOptions: false,
        characterOptions: false
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
                                <MDBIcon icon="khanda" />
                                <MDBInput
                                    label="Initiative"
                                    containerClass="mb-0"
                                    required={true}
                                    onChange={(e) => this.handleChange("initiative", e.target.value)}
                                    onKeyDown={(e) => this.handleKeyDown(e)}
                                    value={this.state.initiative}
                                />
                                <EncounterSelect onChange={(value) => this.handleChange('encounter', value)}/>
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