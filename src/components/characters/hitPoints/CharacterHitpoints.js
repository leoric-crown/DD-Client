import React, { Component } from 'react'
import CharacterHpBar from './CharacterHpBar'
import CharacterHpModifier from './CharacterHpModifier';
import './Hitpoints.css'

class CharacterHitPoints extends Component {
    constructor(props) {
        super(props)
        const { characterStats } = this.props
        const { hitpoints, maxhitpoints } = characterStats
        this.state = {
            updating: false,
            transition: false,
            hitpoints,
            maxhitpoints
        }
    }

    componentDidUpdate() {
        if (this.state.transition) {
            this.handleTransition()
        }
    }

    handleTransition = () => {
        let { hitpoints, maxhitpoints } = this.state
        const target = this.state.transition
        if (target.hitpoints === hitpoints && target.maxhitpoints === maxhitpoints) {
            this.setState({
                transition: false
            })
        } else {
            const { delta } = target
            const newHp = {
                hitpoints: hitpoints + delta.hitpoints,
                maxhitpoints: maxhitpoints + delta.maxhitpoints
            }
            if (delta.hitpoints !== 0) {
                if ((delta.hitpoints < 0 && newHp.hitpoints < target.hitpoints) ||
                    (delta.hitpoints > 0 && newHp.hitpoints > target.hitpoints)) {
                    newHp.hitpoints = target.hitpoints
                }
            }
            if (delta.maxhitpoints !== 0) {
                if ((delta.maxhitpoints < 0 && newHp.maxhitpoints < target.maxhitpoints) ||
                    (delta.maxhitpoints > 0 && newHp.maxhitpoints > target.maxhitpoints)) {
                    newHp.maxhitpoints = target.maxhitpoints
                }
            }
            setTimeout(() => {
                this.setState({
                    ...newHp
                })
            }, 20)
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

    handleSubmit = (fieldsToUpdate) => {
        if (fieldsToUpdate) {
            const updateHp = fieldsToUpdate.find(f => f.propName === 'hitpoints')
            const updateMaxHp = fieldsToUpdate.find(f => f.propName === "maxhitpoints")
            const hitpoints = updateHp ? updateHp.value : this.state.hitpoints
            const maxhitpoints = updateMaxHp ? updateMaxHp.value : this.state.maxhitpoints
            const delta = {
                hitpoints: hitpoints - this.state.hitpoints,
                maxhitpoints: maxhitpoints - this.state.maxhitpoints
            }
            this.setState({
                updating: false,
                transition: {
                    hitpoints,
                    maxhitpoints,
                    delta: {
                        hitpoints: updateHp ? Math.round((hitpoints - this.state.hitpoints) / 20) + (delta.hitpoints > 0 ? 1 : -1) : 0,
                        maxhitpoints: updateMaxHp ? Math.round((hitpoints - this.state.maxhitpoints) / 20) + (delta.maxhitpoints > 0 ? 1 : -1) : 0
                    }
                }
            })
        }
        this.props.onSubmit(fieldsToUpdate)
    }

    render() {
        const { characterStats, user } = this.props
        const { hitpoints, maxhitpoints } = this.state
        return (
            <React.Fragment>
                {this.state.updating && (
                    <CharacterHpModifier
                        characterStats={characterStats}
                        user={user}
                        hitpoints={hitpoints}
                        maxhitpoints={maxhitpoints}
                        onSubmit={this.handleSubmit}
                        onCancel={this.cancelModal}
                    />
                )}
                <CharacterHpBar
                    characterStats={characterStats}
                    user={user}
                    hitpoints={hitpoints}
                    maxhitpoints={maxhitpoints}
                    onClick={this.openModal}
                />
            </React.Fragment>
        )
    }
}

export default CharacterHitPoints