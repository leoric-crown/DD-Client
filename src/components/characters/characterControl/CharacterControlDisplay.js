import React, { Component } from 'react'
import { FaShieldAlt, FaUserShield, FaSkullCrossbones } from 'react-icons/fa'
import { connect } from 'react-redux'

class CharacterControlDisplay extends Component {
    render() {
        const { character, user } = this.props
        const { armorclass, level, conditions } = character
        const canEdit = user && (user.isDM || character.user === user._id)
        const canView = user && (user.isDM || character.player)
        return (
            <React.Fragment>
                {
                    this.props.form ? (
                        <div className="text-center">
                            <div title="Armor Class" className="character-control-stat-icon">
                                <FaShieldAlt color="darkred" />
                                <div>{armorclass}</div>
                            </div>
                            <div title="Level" className="character-control-stat-icon">
                                <FaUserShield color="darkred" />
                                <div>{level}</div>
                            </div>
                            <div className="character-control-stat-icon">
                                <FaSkullCrossbones color="darkred" />
                                {
                                    conditions.length === 0 ?
                                        <span key="condition-ok" style={{ color: 'green', fontWeight: '400'}}>OK</span>
                                        :
                                        conditions.map(condition =>
                                            <div style={{ fontSize: '1rem' }}
                                                className="character-control-condition-names"
                                                key={condition}>
                                                {this.props.conditions.find(c => c._id === condition).name}
                                            </div>
                                        )
                                }
                            </div>
                        </div>
                    ) : (
                            <div className="character-control-display" onClick={canEdit ? this.props.onClick : () => { }}>
                                <div title="Armor Class" className="character-control-stat-icon">
                                    <FaShieldAlt color="darkred" />
                                    {canView && <div>{armorclass}</div>}
                                </div>
                                <div title="Level" className="character-control-stat-icon" onClick={canEdit ? this.props.onClick : () => { }}>
                                    <FaUserShield color="darkred" />
                                    {canView && <div>{level}</div>}
                                </div>
                                <div title="Conditions" className="character-control-stat-icon" onClick={canEdit ? this.props.onClick : () => { }}>
                                    <FaSkullCrossbones color="darkred" />
                                    {canView && this.props.conditions &&
                                        <div className="character-control-conditions">
                                            {
                                                conditions.length === 0 ?
                                                    <span key="condition-ok" style={{ color: 'green' }}>OK</span>
                                                    :
                                                    conditions.map(condition =>
                                                        <div className="character-control-condition-names" key={condition}>{this.props.conditions.find(c => c._id === condition).name}</div>
                                                    )
                                            }
                                        </div>}
                                </div>
                            </div>
                        )
                }
            </React.Fragment>
        )
    }
}

function mapStateToProps({ Conditions }) {
    return {
        conditions: Conditions.list
    }
}

export default connect(mapStateToProps)(CharacterControlDisplay)