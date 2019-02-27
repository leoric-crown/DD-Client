import React, { Component } from 'react'
import CharacterHpBar from './CharacterHpBar'
import CharacterHpModifier from './CharacterHpModifier';

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

    handleSubmit = (fieldsToUpdate, hpNew) => {
        this.setState({
            updating: false,
            hpCurrent: hpNew
        })
        this.props.onSubmit(fieldsToUpdate)
    }

    render() {
        const { characterStats } = this.props
        const { hpCurrent } = this.state
        return (
            <React.Fragment>
                {this.state.updating && (
                    <CharacterHpModifier
                        characterStats={characterStats}
                        hitpoints={hpCurrent.hitpoints}
                        maxhitpoints={hpCurrent.maxhitpoints}
                        onSubmit={this.handleSubmit}
                        onCancel={this.cancelModal}
                    />
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