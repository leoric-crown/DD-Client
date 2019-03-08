import React, { Component } from 'react'
import Select from 'react-select'
import { connect } from 'react-redux'
import { FaSkullCrossbones } from 'react-icons/fa'

const selectStyles = {
    control: styles => ({ ...styles }),
    option: (styles, { isDisabled }) => {
        return {
            ...styles,
            width: '100%',
            backgroundColor: 'white',
            color: isDisabled ? 'gray' : 'black',
            cursor: isDisabled ? 'not-allowed' : 'default'
        }
    }
}

const defaultOption = [{ key: 'none', value: false, label: 'None', condition: false, disabled: true }]

class ConditionSelect extends Component {
    constructor(props) {
        super(props)
        const conditions = this.props.Conditions.list
        if (this.props.filter) {
            conditions.filter(this.props.filter)
        }
        this.state = {
            conditions,
            selected: this.getValueOption()
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.Conditions.list !== prevProps.Conditions.list) {
            console.log('there has been an update to conditions list')
            const conditions = this.props.Conditions.list
            if (this.props.filter) {
                conditions.filter(this.props.filter)
            }
            this.setState({
                conditions
            })
        }
    }

    getValueOption = () => {
        if (this.props.value.length > 0) {
            const conditions = this.props.value
            return conditions.map(c => {
                return { key: c._id, value: c._id, label: c.name, condition: c }
            })
        } else {
            return []
        }
    }

    getSelectOptions = () => {
        const options = []
        const list = this.state.conditions
        list.forEach(condition => {
            options.push({ key: condition._id, value: condition._id, label: condition.name, condition })
        })
        if (options.length === 0) options.push(defaultOption)
        return options
    }

    handleChange = (e) => {
        console.log('handling change', this.state, this.props)
        console.log('event:', e)
        const newSelected = e.filter(c => c._id !== 'none')
        this.setState({
            selected: newSelected
        })
        this.props.onChange(e.value)
    }

    render() {
        console.log('conditionsselect', this.state, this.props)
        return (
            <div style={{ width: '100%' }}>
                <span className="d-flex justify-content-space-evenly">
                    <FaSkullCrossbones size="2rem" color="darkred" style={{ paddingRight: "0.5rem" }} />
                    <div style={{width: '100%'}}>
                        <Select
                            value={this.state.selected}
                            isMulti
                            isClearable
                            onChange={this.handleChange}
                            options={this.getSelectOptions()}
                            isSearchable={true}
                            styles={selectStyles}
                        />
                    </div>
                </span>
            </div>
        )
    }

}

function mapStateToProps({ Conditions }) {
    return {
        Conditions
    }
}

export default connect(mapStateToProps)(ConditionSelect)
