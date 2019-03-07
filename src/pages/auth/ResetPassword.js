import React, { Component } from 'react'
import { validateAll } from 'indicative'
import { handlePasswordRestore } from '../../redux/actions/shared'
import { logoutUser } from '../../redux/actions/authedUser'
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBBtn,
  MDBAlert,
  MDBIcon
} from 'mdbreact'
import { connect } from 'react-redux'
import qs from 'query-string'
import '../../App.css'

class ResetPassword extends Component {
  state = {
    password: '',
    password_confirmation: '',
    token: '',
    showSubmitButton: true,
    errors: {}
  }

  componentDidMount() {
    const token = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true
    }).token
    if (!token) {
      this.props.history.push({
        pathname: '/'
      })
    } else {
      this.setState({
        token
      })
    }
  }

  handleKeyDown = event => {
    switch (event.key) {
      case 'Enter':
        this.handleSubmit()
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

  handleSubmit = () => {
    // Clear previous errors
    this.setState({
      errors: {}
    })

    // While the ajax call finsheds we don't want the user spamming the submit button
    this.setState({
      showSubmitButton: false
    })
    const data = this.state

    const rules = {
      password: 'required|string|min:3|confirmed'
    }

    const messages = {
      required: 'Please fill in the {{ field }} field',
      'password.confirmed': 'Password do not match',
      'password.min': 'Password has to be at least 3 characters long'
    }

    validateAll(data, rules, messages)
      .then(() => {
        this.props
          .dispatch(
            handlePasswordRestore(this.state.password, this.state.token)
          )
          .then(() => {
            if (!this.props.Errors.passwordRestoreSuccess) {
              this.props.dispatch(
                logoutUser(
                  'Token expired. Please follow the steps to restore password again'
                )
              )
              this.props.history.push({
                pathname: '/'
              })
            } else {
              setTimeout(() => {
                this.props.history.push({
                  pathname: '/'
                })
              }, 4000)
            }
          })
      })
      .catch(errors => {
        this.setState({
          showSubmitButton: true
        })
        const formattedErrors = {}
        errors.forEach(error => (formattedErrors[error.field] = error.message))
        this.setState({
          errors: formattedErrors
        })
      })
  }

  render() {
    return (
      <MDBContainer className='login-signup'>
        <MDBRow className='d-flex justify-content-center'>
          <MDBCol md='6'>
            <MDBCard>
              <MDBCardBody className='mx-4 d-row'>
                <div className=''>
                  <h3 className='deep-red-text mb-5'>
                    <MDBIcon
                      style={{ cursor: 'pointer' }}
                      onClick={() =>
                        this.props.history.push({
                          pathname: '/'
                        })
                      }
                      icon='arrow-left'
                    />
                    <strong>&nbsp;Restore Your Password</strong>
                  </h3>
                </div>
                {this.props.Errors.passwordRestoreSuccess && (
                  <MDBAlert color='success'>
                    <MDBIcon icon='check' />
                    &nbsp;&nbsp;&nbsp;
                    {this.props.Errors.passwordRestoreSuccessMessage}
                  </MDBAlert>
                )}
                <MDBInput
                  label='Password'
                  type='password'
                  icon='lock'
                  containerClass='mb-0'
                  required={true}
                  getValue={e => this.handleInputChange('password', e)}
                />
                {this.state.errors.firstName && (
                  <MDBAlert color='danger'>
                    <MDBIcon icon='warning' />
                    &nbsp;&nbsp;&nbsp;{this.state.errors.firstName}
                  </MDBAlert>
                )}
                <MDBInput
                  label='Password Confirmation'
                  type='password'
                  icon='check'
                  containerClass='mb-0'
                  required={false}
                  getValue={e =>
                    this.handleInputChange('password_confirmation', e)
                  }
                />
                {this.state.errors.password && (
                  <MDBAlert color='danger'>
                    <MDBIcon icon='warning' />
                    &nbsp;&nbsp;&nbsp;{this.state.errors.password}
                  </MDBAlert>
                )}
                <br />
                <br />
                {this.state.showSubmitButton && (
                  <div className='text-center mb-3'>
                    <MDBBtn
                      type='button'
                      color='red'
                      rounded
                      className='btn-block z-depth-1a'
                      onClick={() => this.handleSubmit()}
                    >
                      Restore
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

function mapStateToProps({ User, Errors }) {
  return {
    Errors
  }
}

export default connect(mapStateToProps)(ResetPassword)
