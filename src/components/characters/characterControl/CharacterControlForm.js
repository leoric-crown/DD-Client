import React, { Component } from 'react'
import { MDBContainer, MDBBtn, MDBCol } from 'mdbreact'
import { FaArrowRight } from 'react-icons/fa'
import config from '../../../config'
import MyMDBModal from '../../modal/MDBModal'
import CharacterControlDisplay from './CharacterControlDisplay'
import CharacterLevelSelect from '../form/CharacterLevelSelect'
import CharacterAcSelect from '../form/CharacterAcSelect'
import ConditionSelect from '../../conditions/ConditionSelect'

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
        let forceDelta = false
        switch (type) {
            case 'armorclass':
                value = parseInt(value)
                if (isNaN(value)) value = this.props.character.armorclass
                break
            case 'conditions':
                value = value.map(c => c._id)
                forceDelta = true
                break
            default:
                break

        }
        newCharacter[type] = value

        this.setState({
            newCharacter: {...newCharacter},
            delta: forceDelta || newCharacter[type] !== this.props.character[type]
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
        const { armorclass, level, conditions } = newCharacter
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
                        <MDBCol md="12">
                            <h2 className="text-center">{character.name}</h2>
                            <div className="text-center">
                                <img className="card-pic rounded-circle z-depth-0 lg" alt='DnD Turn Tracker Logo' src={`${config.API}/${character.picUrl}`} />
                            </div>
                            <div>
                                <div className="d-flex" style={{ justifyContent: "space-evenly" }}>
                                    <CharacterControlDisplay
                                        character={character}
                                        form
                                    />
                                    {delta && (
                                        <React.Fragment>
                                            <div className="d-flex justify-content-center" style={{flexDirection: 'column'}}><FaArrowRight /></div>
                                            <CharacterControlDisplay
                                                character={newCharacter}
                                                form
                                            />
                                        </React.Fragment>
                                    )}
                                </div>
                                <div className="dflex justify-content-center">
                                    <br/>
                                    <CharacterAcSelect
                                        value={armorclass}
                                        onChange={value => this.handleChange('armorclass', value)}
                                    />
                                    <CharacterLevelSelect
                                        value={level}
                                        onChange={value => this.handleChange('level', value)}
                                    />
                                    <ConditionSelect
                                        style={{width: '100%'}}
                                        value={conditions}
                                        onChange={value => this.handleChange('conditions', value)}
                                    />
                                    <br/>
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