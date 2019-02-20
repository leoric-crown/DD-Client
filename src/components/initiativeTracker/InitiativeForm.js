import React, { Component } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon } from 'mdbreact';
import { createInitiative } from '../../actions/initiatives'
import EncounterSelect from '../encounters/EncounterSelect'
import CharacterSelect from '../characters/CharacterSelect'

const sortByName = (a, b) => {
    if (a.name < b.name) return -1
    if (a.name < b.name) return 1
    return 0
}

const getSelectedCharacter = (options, prevCharacter) => {
    const characterIds = options.map(c => c._id)
    const index = characterIds.indexOf(prevCharacter)
    if (index === characterIds.length - 1) return characterIds[index - 1]
    else return characterIds[(index + 1) % (characterIds.length)]
}

class InitiativeForm extends Component {
    constructor(props) {
        super(props)
        const encounter = this.props.Encounters && this.props.Encounters.list && this.props.Encounters.list.length > 0 ? this.props.Encounters.list.sort(sortByName)[0]._id : false
        const characterOptions = this.filterCharacters(encounter)
        const character = characterOptions.length > 0 ? characterOptions[0]._id : false
        this.state = {
            encounter,
            character,
            characterOptions,
            initiative: '',
            updating: false
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.Initiatives.list.length !== prevProps.Initiatives.list.length) {
            const characterOptions = this.filterCharacters(this.state.encounter)
            const found = characterOptions.find(c => c._id === prevState.character)
            let newCharacter = prevState.character
            if (!found) {
                newCharacter = getSelectedCharacter(characterOptions, prevState.character)
            }
            this.setState({
                encounter: this.state.encounter,
                characterOptions: characterOptions,
                character: newCharacter
            })
        }
    }

    filterCharacters(encounter) {
        if (!encounter) return []
        const { Characters, Initiatives } = this.props
        let characterList = Characters.list
        const initiativeList = Initiatives.list
        if (encounter) {
            let encounterPlayerCharacterIds = initiativeList.filter(initiative => {
                return ((initiative.encounter === encounter) && (initiative.characterStamp.player))
            }).map(i => i.characterStamp._id)
            encounterPlayerCharacterIds = [...new Set(encounterPlayerCharacterIds)]

            if (encounterPlayerCharacterIds.length > 0) {
                characterList = characterList.filter(character => {
                    return character.player ? !encounterPlayerCharacterIds.includes(character._id) : true
                })
            }
        }
        return characterList.sort(sortByName)
    }

    handleCreate() {
        const { initiative, encounter, character } = this.state
        const payload = {
            initiative,
            encounter,
            character
        }

        this.props.dispatch(createInitiative(localStorage.getItem('DNDTOKEN'), payload))
        if (this.state.characterOptions.find(c => c._id === character).player) {
            this.setState({
                character: getSelectedCharacter(this.state.characterOptions, character)
            })
        }
    }

    handleKeyDown = (event) => {
        switch (event.key) {
            case 'Enter':
                this.handleSubmit()
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
                const characterOptions = this.filterCharacters(value)
                this.setState({
                    encounter: value,
                    characterOptions: characterOptions,
                    character: characterOptions.length > 0 ? characterOptions[0]._id : false
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
                                {
                                    this.props.Encounters.list && (
                                        <EncounterSelect
                                            encounters={this.props.Encounters.list.sort(sortByName)}
                                            onChange={value => this.handleChange('encounter', value)}
                                            value={this.state.encounter}
                                        />
                                    )
                                }

                                <br />
                                {
                                    this.state.encounter ?
                                        <CharacterSelect
                                            characters={this.state.characterOptions}
                                            onChange={(value) => this.handleChange('character', value)}
                                            value={this.state.character}
                                        /> :
                                        <div>Please select Encounter first!</div>
                                }
                                <br />
                                <br />
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

export default InitiativeForm