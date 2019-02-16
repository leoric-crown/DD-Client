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

    render() {
        return (
            <div>
                <label className="select-label">Encounter</label>
                <select
                    className="browser-default custom-select"
                    id="Encounter"
                    value={this.state.selected ? this.state.selected : ''}
                    onChange={e => this.handleChange(e.target.value)}>
                    {this.props.encounterOptions}
                </select>
            </div>
        )
    }
}

function mapStateToProps({ Encounters }) {
    console.log('mapStateToProps', Encounters)
    if(Encounters.list) {
        const encounterOptions = Encounters.list.map((encounter) => (
            <option key={encounter._id} value={encounter._id}>{encounter.name}</option>
        ))
        encounterOptions.unshift(defaultSelect)
        return({
            encounterOptions
        })
    }
    else{
        return({
            
        })
    }

}

export default connect(mapStateToProps)(EncounterSelect)