import React from 'react'
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
import { handleSignUp } from '../../redux/actions/shared'
import { validateAll } from 'indicative'
import { clearErrors } from '../../redux/actions/errors';

const defaultUserPic =
  'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png'

class Signup extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    serverError: false,
    serverErrorMessage: '',
    errors: {},
    signUpSuccess: false
  }

  handleKeyDown = event => {
    switch (event.key) {
      case 'Enter':
        this.handleLogin()
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

  handleLogin = () => {
    this.props.dispatch(clearErrors());
    const data = this.state

    const rules = {
      firstName: 'required|string',
      lastName: 'string',
      email: 'required|email',
      password: 'required|string|min:3|confirmed'
    }

    const messages = {
      required: 'Please fill in the {{ field }} field',
      'email.email': 'Please type a valid email',
      'password.confirmed': 'Password do not match',
      'password.min': 'Password has to be at least 3 characters long'
    }

    validateAll(data, rules, messages)
      .then(() => {
        const { errors, serverError, serverErrorMessage, ...payload } = this.state
        payload.callback = window.location.origin
        this.props.dispatch(handleSignUp(payload, defaultUserPic))
          .then(() => {
            if (this.props.Errors.signUpSuccess) {
              this.setState({
                signUpSuccess: true
              })
              setTimeout(() => {
                this.props.history.push({
                  pathname: '/'
                })
              }, 3000)
            }
          })
      })
      .catch(errors => {
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
                    <strong>&nbsp;Signup</strong>
                  </h3>
                </div>
                {this.props.Errors.signUpErrorMessage && (
                  <MDBAlert color='danger'>
                    <MDBIcon icon='warning' />
                    &nbsp;&nbsp;&nbsp;{this.props.Errors.signUpErrorMessage}
                  </MDBAlert>
                )}
                {this.state.signUpSuccess && (
                  <MDBAlert color='success'>
                    <span className="d-flex justify-content-center">
                      <MDBIcon icon='check' />
                      <div className='text-center'>
                        Sign-up success! Please check your e-mail to verify your identity.
                        You will be redirected soon
                      </div>
                    </span>
                  </MDBAlert>
                )}
                <MDBInput
                  label='(First) Name'
                  icon='user'
                  color='black'
                  group
                  containerClass='mb-0'
                  required={true}
                  getValue={e => this.handleInputChange('firstName', e)}
                />
                {this.state.errors.firstName && (
                  <MDBAlert color='danger'>
                    <MDBIcon icon='warning' />
                    &nbsp;&nbsp;&nbsp;{this.state.errors.firstName}
                  </MDBAlert>
                )}
                <MDBInput
                  label='(Last) Name (optional)'
                  icon='user'
                  color='black'
                  group
                  containerClass='mb-0'
                  required={false}
                  getValue={e => this.handleInputChange('lastName', e)}
                />
                {this.state.errors.lastName && (
                  <MDBAlert color='danger'>
                    <MDBIcon icon='warning' />
                    &nbsp;&nbsp;&nbsp;{this.state.errors.lastName}
                  </MDBAlert>
                )}
                <MDBInput
                  label='Your email'
                  icon='envelope'
                  group
                  type='email'
                  getValue={e => this.handleInputChange('email', e)}
                />
                {this.state.errors.email && (
                  <MDBAlert color='success'>
                    <MDBIcon icon='check' />
                    &nbsp;&nbsp;&nbsp;{this.state.errors.email}
                  </MDBAlert>
                )}
                <MDBInput
                  label='Password'
                  type='password'
                  icon='lock'
                  containerClass='mb-0'
                  getValue={e => this.handleInputChange('password', e)}
                />
                <MDBInput
                  label='Confirm Password'
                  type='password'
                  icon='check'
                  containerClass='mb-0'
                  getValue={e =>
                    this.handleInputChange('password_confirmation', e)
                  }
                  onKeyDown={e => this.handleKeyDown(e)}
                />
                {this.state.errors.password && (
                  <MDBAlert color='danger'>
                    <MDBIcon icon='warning' />
                    &nbsp;&nbsp;&nbsp;{this.state.errors.password}
                  </MDBAlert>
                )}
                <br />
                <div className='text-center mb-3'>
                  <MDBBtn
                    type='button'
                    color='red'
                    rounded
                    className='btn-block z-depth-1a'
                    onClick={() => this.handleLogin()}
                  >
                    Register
                  </MDBBtn>
                </div>
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
    User,
    Errors
  }
}

export default connect(mapStateToProps)(Signup)
