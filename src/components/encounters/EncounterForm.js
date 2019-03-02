import React, { Component } from 'react'
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBBtn,
  MDBIcon,
  MDBAlert
} from 'mdbreact'
import { connect } from 'react-redux'
import {
  postEncounter,
  patchEncounter,
  clearActiveEncounter
} from '../../redux/actions/encounters'
import { validateAll } from 'indicative'

const statusOptions = [
  <option key='Preparing' value='Preparing'>
    Preparing
  </option>,
  <option key='Concluded' value='Concluded'>
    Concluded
  </option>,
  <option key='Active' value='Active'>
    Active
  </option>
]

class EncounterForm extends Component {
  state = {
    name: '',
    status: statusOptions[0].value,
    updating: false,
    style: {},
    statusOptions: statusOptions,
    errors: {}
  }

  componentDidMount() {
    if (!this.state.updating && this.props.encounter) {
      const { name, status } = this.props.encounter
      this.setState({
        name,
        status,
        updating: this.props.encounter,
        style: {
          width: '25em'
        }
      })
    }
  }

  handleKeyDown = event => {
    switch (event.key) {
      case 'Enter':
        this.handleSubmit(this.props.toggleButtonNavigation)
        break
      case 'Escape':
        this.handleCancel()
        break
      default:
        break
    }
  }

  handleInputChange = (type, value) => {
    this.setState({
      [type]: value
    })
  }

  handleUpdate = () => {
    const { updating, style, statusOptions, ...changedEncounter } = this.state
    const fieldsToUpdate = Object.entries(changedEncounter)
      .filter(([key, value]) => {
        return updating[key] && updating[key] !== value
      })
      .map(([propName, value]) => {
        return {
          propName,
          value
        }
      })
    if (fieldsToUpdate.length > 0) {
      this.props.dispatch(
        patchEncounter(
          localStorage.getItem('DNDTOKEN'),
          fieldsToUpdate,
          updating.request.url
        )
      )
    } else {
      this.handleCancel()
    }
    if (this.state.status !== 'Active' && updating.status === 'Active') {
      this.props.dispatch(clearActiveEncounter())
    }
  }

  handleCreate = () => {
    const data = this.state

    const rules = {
      name: 'required|string'
    }

    const messages = {
      required: 'Please fill in the {{ field }} field'
    }

    validateAll(data, rules, messages)
      .then(() => {
        this.setState({
          errors: {}
        })

        const payload = {
          name: this.state.name,
          status: this.state.status
        }

        this.props.dispatch(
          postEncounter(localStorage.getItem('DNDTOKEN'), payload)
        )
        this.props.toggleButtonNavigation('Submit_Encounter')
      })
      .catch(errors => {
        const formattedErrors = {}
        errors.forEach(error => (formattedErrors[error.field] = error.message))
        this.setState({
          errors: formattedErrors
        })
        return
      })
  }

  handleSubmit = () => {
    if (!this.state.updating) {
      this.handleCreate()
    } else {
      this.handleUpdate()
    }
    if (this.props.done) this.props.done()
  }

  handleCancel = () => {
    this.props.done()
  }

  render() {
    const { name, status } = this.state
    const { toggleButtonNavigation } = this.props
    return (
      <MDBContainer style={this.state.style}>
        <MDBRow className='d-flex justify-content-center'>
          <MDBCol md='8'>
            <MDBCard className='create-character'>
              <MDBCardBody className='mx-4 d-row'>
                <div className='text-center'>
                  <h3 className='mb-5'>
                    <strong style={formHeaderStyle}>
                      &nbsp;
                      {this.state.updating ? (
                        `Edit ${this.state.updating.name}`
                      ) : (
                        <MDBIcon
                          className='black-text'
                          icon='users'
                          size='4x'
                        />
                      )}
                    </strong>
                  </h3>
                </div>
                <MDBIcon icon='khanda' />
                <MDBInput
                  label='Name'
                  group
                  containerClass='mb-0'
                  required={true}
                  onChange={e => this.handleInputChange('name', e.target.value)}
                  onKeyDown={e => this.handleKeyDown(e)}
                  value={name}
                />
                {this.state.errors.name && (
                  <MDBAlert color='danger'>
                    <MDBIcon icon='warning' />
                    &nbsp;&nbsp;&nbsp;{this.state.errors.name}
                  </MDBAlert>
                )}
                <label className='select-label'>Status </label>
                <select
                  className='browser-default custom-select'
                  id='status'
                  value={status}
                  onChange={e =>
                    this.handleInputChange('status', e.target.value)
                  }
                >
                  {this.state.statusOptions}
                </select>
                <br />
                <br />
                <div className='text-center'>
                  <MDBBtn
                    type='button'
                    rounded
                    color='black'
                    className='btn-block z-depth-1a'
                    onClick={() => this.handleSubmit(toggleButtonNavigation)}
                  >
                    {this.state.updating ? 'Save' : 'Create'}
                  </MDBBtn>
                </div>
                {this.state.updating ? <br /> : ''}
                {this.state.updating && (
                  <div className='text-center'>
                    <MDBBtn
                      type='button'
                      rounded
                      color='black'
                      className='btn-block z-depth-1a'
                      onClick={this.handleCancel}
                    >
                      Cancel
                    </MDBBtn>
                  </div>
                )}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    )
  }
}

function mapStateToProps({ User }) {
  return {
    User
  }
}

const formHeaderStyle = {
  color: 'black'
}
export default connect(mapStateToProps)(EncounterForm)
