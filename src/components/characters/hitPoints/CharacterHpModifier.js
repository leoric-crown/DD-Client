import React, { Component } from 'react'
import { MDBContainer, MDBBtn, MDBInput, MDBCol, MDBAlert, MDBIcon } from 'mdbreact'
import { FaPlus, FaMinus } from 'react-icons/fa'
import CharacterHpBar from './CharacterHpBar'
import config from '../../../config.json'
import MyMDBModal from '../../modal/MDBModal'
import { validateAll } from 'indicative'

class CharacterHpModifier extends Component {
    constructor(props) {
        super(props)
        const { hitpoints, maxhitpoints } = this.props
        this.state = {
            addHitpoints: 0,
            addMaxhitpoints: 0,
            hpNew: {
                hitpoints,
                maxhitpoints
            },
            editMaxHP: false,
            errors: {}
        }
    }

    handleChange = (type, value) => {
        const newState = {}
        switch (type) {
            case 'editMaxHP':
                newState.hpNew = {
                    hitpoints: this.state.hpNew.hitpoints,
                    maxhitpoints: this.props.maxhitpoints
                }
                break
            default:
                break

        }
        newState[type] = value

        this.setState({
            ...newState
        })
    }

    reset = () => {
        this.setState({
            addHitpoints: 0,
            addMaxhitpoints: 0,
            hpNew: this.state.hpCurrent
        })
    }

    previewChanges = (type, sum = true) => {
        let { hpNew, addHitpoints, addMaxhitpoints } = this.state
        let { hitpoints, maxhitpoints } = hpNew

        const rules = {
            addHitpoints: 'number',
            addMaxhitpoints: 'number'
        }
        const messages = {
            number: 'Please input a number value'
        }
        validateAll({ addHitpoints, addMaxhitpoints }, rules, messages)
            .then(() => {
                this.setState({
                    errors: {}
                })

                if (addHitpoints + addMaxhitpoints > 0) {
                    switch (type) {
                        case 'hitpoints':
                            hitpoints = hitpoints + (sum ? addHitpoints : -addHitpoints)
                            if (hitpoints > maxhitpoints) hitpoints = maxhitpoints
                            addHitpoints = 0
                            break
                        case 'maxhitpoints':
                            maxhitpoints = maxhitpoints + (sum ? addMaxhitpoints : -addMaxhitpoints)
                            addMaxhitpoints = 0
                            break
                        default:
                            break
                    }

                    if (hitpoints < 0) {
                        hitpoints = 0
                    }
                    if (maxhitpoints < 0) {
                        maxhitpoints = this.state.maxhitpoints
                    }

                    this.setState({
                        addHitpoints,
                        addMaxhitpoints,
                        hpNew: {
                            hitpoints,
                            maxhitpoints
                        }
                    })
                }
            })
            .catch(errors => {
                const formattedErrors = {}
                errors.forEach(error => (formattedErrors[error.field] = error.message))
                this.setState({
                    errors: formattedErrors
                })
                return
            })
    }

    handleSubmit = () => {
        const { hpNew } = this.state
        const { hitpoints, maxhitpoints } = this.props
        const hpCurrent = {
            hitpoints,
            maxhitpoints
        }

        const fieldsToUpdate = Object.entries(hpNew).filter(([propName, value]) => {
            return (hpCurrent[propName] !== value)
        }).map(([propName, value]) => {
            return {
                propName,
                value
            }
        })
        this.props.onSubmit(fieldsToUpdate.length > 0 ? fieldsToUpdate : false)
        this.setState({
            hpCurrent: hpNew,
            hpNew
        })
    }



    render() {
        const { characterStats, hitpoints, maxhitpoints, user } = this.props
        const { hpNew, addHitpoints, addMaxhitpoints } = this.state
        return (
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
                    header: 'Hitpoint Modifier',
                    confirm: 'Save Changes'
                }}
            >
                <MDBContainer className="d-flex justify-content-center">
                    <MDBCol md="8">
                        <div className="text-center">
                            <h2>{characterStats.name}</h2>
                            <img className="card-pic rounded-circle z-depth-0 lg" alt='DnD Turn Tracker Logo' src={`${config.API}/${characterStats.picUrl}`} />
                            <CharacterHpBar
                                characterStats={characterStats}
                                user={user}
                                hitpoints={hitpoints}
                                maxhitpoints={maxhitpoints}
                            />
                            {(hitpoints !== hpNew.hitpoints || maxhitpoints !== hpNew.maxhitpoints) && (
                                <div>
                                    <h3>New HP</h3>
                                    <CharacterHpBar
                                        characterStats={characterStats}
                                        user={user}
                                        hitpoints={hpNew.hitpoints}
                                        maxhitpoints={hpNew.maxhitpoints}
                                    />
                                </div>
                            )}
                            <div className="d-flex" style={{ alignItems: 'center' }}>
                                <FaMinus className="hp-modifier-icons" color="red" onClick={() => this.previewChanges('hitpoints', false)} />
                                <MDBInput
                                    className="text-center"
                                    label="Hitpoints"
                                    containerClass="mb-0"
                                    onChange={(e) => this.handleChange("addHitpoints", e.target.value)}
                                    value={addHitpoints.toString()}
                                />
                                <FaPlus className="hp-modifier-icons" color="green" onClick={() => this.previewChanges('hitpoints')} />
                            </div>
                            {this.state.errors.addHitpoints && (
                                <MDBAlert color='danger'>
                                    <MDBIcon icon='warning' />
                                    &nbsp;&nbsp;&nbsp;{this.state.errors.addHitpoints}
                                </MDBAlert>
                            )}
                            {this.state.editMaxHP && (
                                <div>
                                    <div className="d-flex" style={{ alignItems: 'center' }}>
                                        <FaMinus className="hp-modifier-icons" color="red" onClick={() => this.previewChanges('maxhitpoints', false)} />
                                        <MDBInput
                                            className="text-center"
                                            label="Max Hitpoints"
                                            containerClass="mb-0"
                                            onChange={(e) => this.handleChange("addMaxhitpoints", e.target.value)}
                                            value={addMaxhitpoints.toString()}
                                        />
                                        <FaPlus className="hp-modifier-icons" color="green" onClick={() => this.previewChanges('maxhitpoints')} />
                                    </div>
                                    {this.state.errors.addMaxhitpoints && (
                                        <MDBAlert color='danger'>
                                            <MDBIcon icon='warning' />
                                            &nbsp;&nbsp;&nbsp;{this.state.errors.addMaxhitpoints}
                                        </MDBAlert>
                                    )}
                                </div>
                            )}
                            <MDBInput
                                label="Max HP"
                                type="checkbox"
                                id="checkbox"
                                onChange={(e) => this.handleChange('editMaxHP', e.target.checked)}
                                checked={this.state.editMaxHP}
                            />
                            <MDBBtn onClick={this.reset} className="btn-block btn-black z-depth-1a">Reset</MDBBtn>
                        </div>
                    </MDBCol>
                </MDBContainer>
            </MyMDBModal>

        )
    }
}

export default CharacterHpModifier