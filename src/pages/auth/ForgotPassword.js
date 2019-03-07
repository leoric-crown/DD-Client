import React, { Component } from 'react'
import { validateAll } from 'indicative'
import { handleForgotMyPassword } from '../../redux/actions/shared'
import { connect } from 'react-redux'
import { clearErrors } from '../../redux/actions/errors'
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

class ForgotPassword extends Component {
  state = {
    email: '',
    errors: {},
    showSubmitButton: true
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
    this.props.dispatch(clearErrors())
    this.setState({
      errors: {}
    })

    // While the ajax call finsheds we don't want the user spamming the submit button
    this.setState({
      showSubmitButton: false
    })
    const data = this.state

    const rules = {
      email: 'required|email'
    }

    const messages = {
      required: 'Please fill in the {{ field }} field',
      'email.email': 'Please type a valid email'
    }

    validateAll(data, rules, messages)
      .then(() => {
        this.props
          .dispatch(
            handleForgotMyPassword(this.state.email, window.location.origin)
          )
          .then(() => {
            if (!this.props.Errors.forgotPasswordSuccessMessage)
              this.setState({
                showSubmitButton: true
              })
          })
      })
      .catch(errors => {
        console.log(errors)
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
                    <strong>&nbsp;Forgot my password</strong>
                  </h3>
                  Please enter your email
                </div>
                {this.props.Errors.forgotPasswordSuccessMessage && (
                  <MDBAlert color='success'>
                    <MDBIcon icon='check' />
                    &nbsp;&nbsp;&nbsp;
                    {this.props.Errors.forgotPasswordSuccessMessage}
                  </MDBAlert>
                )}
                {this.props.Errors.forgotPasswordFailMessage && (
                  <MDBAlert color='danger'>
                    <MDBIcon icon='warning' />
                    &nbsp;&nbsp;&nbsp;
                    {this.props.Errors.forgotPasswordFailMessage}
                  </MDBAlert>
                )}
                <MDBInput
                  label='Email'
                  type='email'
                  icon='envelope'
                  containerClass='mb-0'
                  required={true}
                  getValue={e => this.handleInputChange('email', e)}
                />
                {this.state.errors.email && (
                  <MDBAlert color='danger'>
                    <MDBIcon icon='warning' />
                    &nbsp;&nbsp;&nbsp;{this.state.errors.email}
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
                      Submit
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

function mapStateToProps({ Errors }) {
  return {
    Errors
  }
}

export default connect(mapStateToProps)(ForgotPassword)
