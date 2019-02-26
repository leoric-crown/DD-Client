import React, { Component } from 'react'
import Modal from '../../modal/Modal'
import { MDBInput, MDBRow, MDBCol, MDBBtn } from 'mdbreact'
import config from '../../../config.json'
import CharacterHpBar from './CharacterHpBar'
import { FaMinus, FaPlus } from 'react-icons/fa'

class CharacterHitPoints extends Component {
    constructor(props) {
        super(props)
        const { characterStats } = this.props
        const { hitpoints, maxhitpoints } = characterStats
        this.state = {
            updating: false,
            addHitpoints: 0,
            addMaxhitpoints: 0,
            hpCurrent: {
                hitpoints,
                maxhitpoints
            },
            hpNew: {
                hitpoints,
                maxhitpoints
            },
            editMaxHP: false
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
                    maxhitpoints: this.state.hpCurrent.maxhitpoints
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
                maxhitpoints = this.state.hpCurrent.maxhitpoints
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
        const { hpCurrent, hpNew } = this.state

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
            updating: false,
            hpCurrent: hpNew,
            hpNew
        })
    }

    render() {
        const { characterStats } = this.props
        const { hpCurrent, hpNew, addHitpoints, addMaxhitpoints } = this.state
        return (
            <React.Fragment>
                {this.state.updating && (
                    <Modal
                        title="Modify Character HP"
                        onCancel={this.cancelModal}
                        onConfirm={this.handleSubmit}
                        canCancel
                        canConfirm
                    >
                        <MDBCol>
                            <img className="character-pic rounded-circle z-depth-0 lg" alt='DnD Turn Tracker Logo' src={`${config.API}/${characterStats.picUrl}`} />
                            <h2>{characterStats.name}</h2>
                            {/* <h4 className="pad-hit-points">{hpCurrent.hitpoints} / {hpCurrent.maxhitpoints}</h4> */}
                            <CharacterHpBar
                                hitpoints={hpCurrent.hitpoints}
                                maxhitpoints={hpCurrent.maxhitpoints}
                            />
                            {(hpCurrent.hitpoints !== hpNew.hitpoints || hpCurrent.maxhitpoints !== hpNew.maxhitpoints) && (
                                <div>
                                    <h3>New HP</h3>
                                    <CharacterHpBar
                                        hitpoints={hpNew.hitpoints}
                                        maxhitpoints={hpNew.maxhitpoints}
                                    />
                                </div>
                            )}
                            <MDBRow className="center-row-content">
                                <FaMinus className="character-hitpoints" color="red" onClick={() => this.previewChanges('hitpoints', false)} />
                                <MDBInput
                                    className="browser-default custom-select text-center"
                                    label="Hitpoints"
                                    containerClass="mb-0"
                                    onChange={(e) => this.handleChange("addHitpoints", e.target.value)}
                                    value={addHitpoints.toString()}
                                />
                                <FaPlus className="character-hitpoints" color="green" onClick={() => this.previewChanges('hitpoints')} />
                            </MDBRow>
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
                    </Modal>
                )}
                <CharacterHpBar
                    hitpoints={hpCurrent.hitpoints}
                    maxhitpoints={hpCurrent.maxhitpoints}
                    onClick={this.openModal}
                />
            </React.Fragment>
        )
    }
}
export default CharacterHitPoints