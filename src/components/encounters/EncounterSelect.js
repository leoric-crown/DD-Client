import React, { Component } from 'react'
import { connect } from 'react-redux'

const defaultSelect = <option key="default" value="" disabled> Choose Encounter... </option>
class EncounterSelect extends Component {
    state = {
        selected: null
    }

    handleChange(value) {
        this.setState({
            selected: value
        })
        this.props.onChange(value)
    }

    getInitialState() {
        if (this.props.encounterOptions && !this.state.selected) {
            const defaultOption = this.props.encounterOptions[1]
            this.setState({
                selected: defaultOption
            })
            this.props.onChange(defaultOption.props.value)
        }
    }

    componentWillReceiveProps() {
       this.getInitialState()
    }

    componentDidMount() {
        this.getInitialState()
    }
    render() {
        return (
            <div>
                {
                    this.props.encounterOptions && (
                        <div>
                            <label className="select-label">Encounter</label>
                            <select
                                className="browser-default custom-select"
                                id="Encounter"
                                value={this.state.selected ? this.state.selected : this.props.preSelected ? this.props.encounterOptions[0] : ''}
                                onChange={e => this.handleChange(e.target.value)}>
                                {this.props.encounterOptions}
                            </select>
                        </div>
                    )
                }
            </div>
        )
    }
}

function mapStateToProps({ Encounters }) {
    if (Encounters.list) {
        const encounterOptions = Encounters.list.map((encounter) => (
            <option key={encounter._id} value={encounter._id}>{encounter.name}</option>
        ))
        encounterOptions.unshift(defaultSelect)
        return ({
            encounterOptions
        })
    }
    else {
        return ({
            encounterOptions: false
        })
    }

}

export default connect(mapStateToProps)(EncounterSelect)