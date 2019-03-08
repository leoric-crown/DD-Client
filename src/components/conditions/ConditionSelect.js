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

class ConditionSelect extends Component {
    constructor(props) {
        super(props)
        this.selectOptions = this.props.Conditions.list.map(condition => {
            return {
                _id: condition._id,
                value: condition._id,
                label: condition.name,
                condition
            }
        })
        this.state = {
            selected: this.getValueOption()
        }
    }

    getValueOption = () => {
        if (this.props.value.length > 0) {
            const conditions = this.props.value
            return conditions.map(id => {
                // const conditionDocument = this.props.Conditions.list.find(c => conditions.includes(c._id))
                const conditionDocument = this.props.Conditions.list.find(
                    condition => condition._id ===  id
                )
                return {
                    _id: conditionDocument._id,
                    value: conditionDocument._id,
                    label: conditionDocument.name,
                    condition: conditionDocument
                }
            })
        } else {
            return []
        }
    }

    handleChange = (newSelected) => {
        this.setState({
            selected: newSelected
        })
        this.props.onChange(newSelected)
    }

    render() {
        return (
            <div style={{ width: '100%' }}>
                <div className="d-flex justify-content-space-evenly">
                    <FaSkullCrossbones size="2rem" color="darkred" style={{ paddingRight: "0.5rem" }} />
                    <div style={{ width: '100%' }}>
                        <Select
                            value={this.state.selected}
                            placeholder="Select Condition"
                            isMulti
                            isClearable
                            closeMenuOnSelect={false}
                            onChange={this.handleChange}
                            options={this.selectOptions}
                            isSearchable={true}
                            styles={selectStyles}
                        />
                    </div>
                </div>
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
