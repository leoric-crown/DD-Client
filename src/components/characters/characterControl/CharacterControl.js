import React, { Component } from 'react'
import CharacterControlForm from './CharacterControlForm';
import CharacterControlDisplay from './CharacterControlDisplay';

class CharacterControl extends Component {
    constructor(props) {
        super(props)
        this.state = {
            updating: false,
            character: this.props.character,
            newCharacter: this.props.character
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

    handleSubmit = (fieldsToUpdate, newCharacter) => {
        this.setState({
            updating: false,
            character: newCharacter,
            newCharacter
        })
        this.props.onSubmit(fieldsToUpdate)
    }

    render() {
        const { character } = this.state
        return (
            <React.Fragment>
                {this.state.updating && (
                    <CharacterControlForm
                        character={character}
                        onCancel={this.cancelModal}
                        onSubmit={this.handleSubmit}
                    />
                )}
                <CharacterControlDisplay
                    character={character}
                    onClick={this.openModal}
                />
            </React.Fragment>
        )
    }

}

export default CharacterControl