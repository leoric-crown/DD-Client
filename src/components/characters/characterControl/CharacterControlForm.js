import React, { Component } from 'react'
import { MDBContainer, MDBBtn, MDBInput, MDBCol, MDBRow } from 'mdbreact'
import { FaPlus, FaMinus, FaArrowRight } from 'react-icons/fa'
import config from '../../../config.json'
import MyMDBModal from '../../modal/MDBModal'
import CharacterControlDisplay from './CharacterControlDisplay.js';

class CharacterControlForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newCharacter: { ...this.props.character },
            delta: false
        }
    }

    handleChange = (type, value) => {
        const { newCharacter } = this.state
        switch (type) {
            case 'armorclass':
                value = parseInt(value)
                if (isNaN(value)) value = this.props.character.armorclass
                break
            default:
                break

        }
        newCharacter[type] = value

        this.setState({
            newCharacter,
            delta: newCharacter[type] !== this.props.character[type]
        })
    }

    reset = () => {
        this.setState({
            newCharacter: { ...this.props.character },
            delta: false
        })
    }

    handleSubmit = () => {
        const { newCharacter } = this.state
        const { character } = this.props

        const fieldsToUpdate = Object.entries(newCharacter).filter(([propName, value]) => {
            return (character[propName] !== value)
        }).map(([propName, value]) => {
            return {
                propName,
                value
            }
        })
        this.props.onSubmit(fieldsToUpdate.length > 0 ? fieldsToUpdate : false, newCharacter)
    }

    render() {
        const { character } = this.props
        const { newCharacter } = this.state
        const { armorclass } = newCharacter
        const { delta } = this.state
        return (
            <React.Fragment>
                <MyMDBModal
                    toggle={this.props.onCancel}
                    isOpen={true}
                    canConfirm
                    onConfirm={this.handleSubmit}
                    fullHeight
                    centered
                    position="right"
                    backdrop={false}
                    labels={{
                        header: 'Update Character Stats',
                        confirm: 'Save Changes'
                    }}
                >
                    <MDBContainer className="d-flex justify-content-center">
                        <MDBCol md="8">
                            {/* <img className="character-pic rounded-circle z-depth-0 lg" alt='DnD Turn Tracker Logo' src={`${config.API}/${character.picUrl}`} />
                            <h2>{character.name}</h2> */}
                            <h3 className="text-center">{character.name}</h3>
                            <div className="text-center">
                                <img className="character-pic rounded-circle z-depth-0 lg" alt='DnD Turn Tracker Logo' src={`${config.API}/${character.picUrl}`} />
                            </div>
                            <div>
                                <div className="d-flex" style={{ justifyContent: "space-evenly" }}>
                                    <CharacterControlDisplay
                                        character={character}
                                        form
                                    />
                                    {delta && (
                                        <React.Fragment>
                                            <span style={{marginTop: '0.8rem'}}><FaArrowRight /></span>
                                            <CharacterControlDisplay
                                                character={newCharacter}
                                                form
                                            />
                                        </React.Fragment>
                                    )}
                                </div>
                                <div className="dflex justify-content-center">
                                    <MDBInput
                                        className="browser-default custom-select text-center"
                                        label="Armor Class"
                                        containerClass="mb-0"
                                        onChange={(e) => this.handleChange("armorclass", e.target.value)}
                                        value={armorclass.toString()}
                                    />
                                </div>
                            </div>
                            <MDBBtn onClick={this.reset} className="btn-block btn-black z-depth-1a">Reset</MDBBtn>
                        </MDBCol>
                    </MDBContainer>
                </MyMDBModal>
            </React.Fragment>
        )
    }
}

export default CharacterControlForm