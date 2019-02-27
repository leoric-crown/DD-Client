import React, { Component } from 'react'
import { MDBContainer, MDBBtn, MDBInput, MDBCol, MDBRow } from 'mdbreact'
import { FaPlus, FaMinus } from 'react-icons/fa'
import CharacterHpBar from './CharacterHpBar'
import config from '../../../config.json'
import MyMDBModal from '../../modal/MDBModal'

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
            editMaxHP: false
        }
    }

    handleChange = (type, value) => {
        const newState = {}
        switch (type) {
            case 'addHitpoints':
            case 'addMaxhitpoints':
                value = parseInt(value)
                if (isNaN(value)) value = 0
                break
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
        this.props.onSubmit(fieldsToUpdate.length > 0 ? fieldsToUpdate : false, hpNew)
        this.setState({
            hpCurrent: hpNew,
            hpNew
        })
    }

    

    render() {
        const { characterStats, hitpoints, maxhitpoints } = this.props
        const { hpNew, addHitpoints, addMaxhitpoints } = this.state
        return (
            <MyMDBModal
                toggle={this.props.onCancel}
                isOpen={true}
                canConfirm
                onConfirm={(this.handleSubmit)}
                fullHeight
                position="right"
                backdrop={false}
                labels={{
                    header: 'Hitpoint Modifier',
                    confirm: 'Save Changes'
                }}
            >
                <MDBContainer className="d-flex justify-content-center">
                    <MDBCol md="8">
                        <img className="character-pic rounded-circle z-depth-0 lg" alt='DnD Turn Tracker Logo' src={`${config.API}/${characterStats.picUrl}`} />
                        <h2>{characterStats.name}</h2>
                        <CharacterHpBar
                            hitpoints={hitpoints}
                            maxhitpoints={maxhitpoints}
                        />
                        {(hitpoints !== hpNew.hitpoints || maxhitpoints !== hpNew.maxhitpoints) && (
                            <div>
                                <h3>New HP</h3>
                                <CharacterHpBar
                                    hitpoints={hpNew.hitpoints}
                                    maxhitpoints={hpNew.maxhitpoints}
                                />
                            </div>
                        )}
                        <div className="center-row-content">
                            <FaMinus className="character-hitpoints" color="red" onClick={() => this.previewChanges('hitpoints', false)} />
                            <MDBInput
                                className="browser-default custom-select text-center"
                                label="Hitpoints"
                                containerClass="mb-0"
                                onChange={(e) => this.handleChange("addHitpoints", e.target.value)}
                                value={addHitpoints.toString()}
                            />
                            <FaPlus className="character-hitpoints" color="green" onClick={() => this.previewChanges('hitpoints')} />
                        </div>
                        <MDBRow className="center-row-content">
                            {this.state.editMaxHP && (
                                <React.Fragment>
                                    <FaMinus className="character-hitpoints" color="red" onClick={() => this.previewChanges('maxhitpoints', false)} />
                                    <MDBInput
                                        className="browser-default custom-select text-center"
                                        label="Max Hitpoints"
                                        containerClass="mb-0"
                                        onChange={(e) => this.handleChange("addMaxhitpoints", e.target.value)}
                                        value={addMaxhitpoints.toString()}
                                    />
                                    <FaPlus className="character-hitpoints" color="green" onClick={() => this.previewChanges('maxhitpoints')} />
                                </React.Fragment>
                            )}
                        </MDBRow>
                        <MDBInput
                            label="Max HP"
                            className="mycheckbox"
                            type="checkbox"
                            id="checkbox"
                            onChange={(e) => this.handleChange('editMaxHP', e.target.checked)}
                            value={this.state.editMaxHP ? "true" : "false"}
                        />
                        <MDBBtn onClick={this.reset} className="btn-block btn-black z-depth-1a">Reset</MDBBtn>
                    </MDBCol>
                </MDBContainer>
            </MyMDBModal>

        )
    }
}

export default CharacterHpModifier