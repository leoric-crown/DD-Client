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
import {  handleSignUp } from '../../redux/actions/shared'
import { validateAll } from 'indicative'
import { clearErrors } from '../../redux/actions/errors';

const defaultUserPic =
  'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png'

class Signup extends React.Component {
  state = {
    name: '',
    email: '',
    serverError: false,
    serverErrorMessage: '',
    errors: {}
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
      name: 'required|string',
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
        const payload = {
          email: this.state.email,
          password: this.state.password
        }
        this.props.dispatch(handleSignUp(payload, defaultUserPic))
          .then(() => {
            if (this.props.Errors.signUpSuccess) {
              this.props.history.push({
                pathname: '/characters'
              })
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
                <MDBInput
                  label='Your name'
                  icon='user'
                  color='black'
                  group
                  containerClass='mb-0'
                  required={true}
                  getValue={e => this.handleInputChange('name', e)}
                />
                {this.state.errors.name && (
                  <MDBAlert color='danger'>
                    <MDBIcon icon='warning' />
                    &nbsp;&nbsp;&nbsp;{this.state.errors.name}
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
                  <MDBAlert color='danger'>
                    <MDBIcon icon='warning' />
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
