import React, { Component } from 'react'
import CharacterHpBar from './CharacterHpBar'
import CharacterHpModifier from './CharacterHpModifier';
import './Hitpoints.css'

class CharacterHitPoints extends Component {
    state = {
        updating: false
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
        this.setState({
            updating: false
        })
        this.props.onSubmit(fieldsToUpdate)
    }

    render() {
        const { characterStats } = this.props
        const { hitpoints, maxhitpoints } = characterStats
        return (
            <React.Fragment>
                {this.state.updating && (
                    <CharacterHpModifier
                        characterStats={characterStats}
                        hitpoints={hitpoints}
                        maxhitpoints={maxhitpoints}
                        onSubmit={this.handleSubmit}
                        onCancel={this.cancelModal}
                    />
                )}
                <CharacterHpBar
                    hitpoints={hitpoints}
                    maxhitpoints={maxhitpoints}
                    onClick={this.openModal}
                />
            </React.Fragment>
        )
    }
}

export default CharacterHitPoints