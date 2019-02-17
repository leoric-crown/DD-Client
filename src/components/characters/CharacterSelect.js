import React, { Component } from 'react'
import { connect } from 'react-redux'

const defaultSelect = <option key="default" value="" disabled> Choose Character... </option>
class CharacterSelect extends Component {
    state = {
        selected: null,
        options: null
    }

    handleChange(value) {
        this.setState({
            selected: value
        })
        this.props.onChange(value)
    }

    getInitialState() {
        console.log('getting initial state with existing state:', this.state)
        if (this.props.characterOptions && !this.state.options) {
            this.filterOptions()
        }
        else if (this.props.characterOptions && this.state.options && !this.state.selected) {
            const newSelected = this.props.preSelected ? this.state.options[this.state.options.length - 1] : this.state.options[0]
            if (!this.state.selected || (this.state.selected.props.value !== newSelected.props.value)) {
                console.log('newSelected', newSelected)
                this.setState({
                    selected: newSelected
                })
                this.props.onChange(newSelected.props.value)
            }
        }
    }

    componentWillReceiveProps() {
        console.log('componentWillReceiveProps')
        this.getInitialState()
    }

    componentDidUpdate() {
        console.log('componentDidUpdate')
        this.getInitialState()
    }

    filterOptions() {
        console.log('filtering options')
        const { characterOptions } = this.props
        switch (this.props.filterBy) {
            case 'encounters':
                const encounterCharacters = this.props.Initiatives.list.filter(initiative => {
                    return initiative.encounter === this.props.filterValue
                }).map(initiative => initiative.character._id)
                console.log(`encounterCharacters for ${this.props.filterValue}`, encounterCharacters)
                console.log('filtering using array:', characterOptions)
                this.setState({
                    options: characterOptions.filter(option => (
                        !encounterCharacters.includes(option.props.value)
                    ))
                })
                break
            default:
                if (characterOptions.length > 0) {

                    console.log('setting default options', characterOptions.length)
                    this.setState({
                        options: characterOptions
                    })
                }

                break
        }
    }

    render() {
        console.log('rendering characterselect, state', this.state, 'props', this.props)
        return (
            <div>
                {
                    this.state.options && this.state.selected && (
                        <div>
                            <label className="select-label">Character</label>
                            <select
                                className="browser-default custom-select"
                                id="Character"
                                value={this.state.selected}
                                onChange={e => this.handleChange(e.target.value)}>
                                {this.state.options}
                            </select>
                        </div>
                    )
                }
            </div>
        )
    }
}

function mapStateToProps({ Characters, Initiatives }) {
    if (Characters.list) {
        const characterOptions = Characters.list.map((character) => (
            <option key={character._id} value={character._id}>{character.name}</option>
        ))
        characterOptions.unshift(defaultSelect)
        return ({
            characterOptions,
            Initiatives
        })
    }
    else {
        return ({
            characterOptions: false,
            Initiatives
        })
    }

}

export default connect(mapStateToProps)(CharacterSelect)