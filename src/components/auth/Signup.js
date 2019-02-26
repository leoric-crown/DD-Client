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
import * as API from '../../utils/api'
import { connect } from 'react-redux'
import { handleInitialData } from '../../redux/actions/shared'
import { setAuthedUser } from '../../redux/actions/authedUser'
import { validateAll } from 'indicative'

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
        API.signup(payload)
          .then(res => {
            // We set errors to empty object to clear previous errors
            this.setState({
              errors:{}
            })
            if (res.status.code !== 200) {
              console.log(res.status.message)
              this.setState({
                serverError: true,
                serverErrorMessage: res.status.message
              })
              return
            }

            const authedUserData = {
              email: res.email,
              photoURL: !res.photoURL ? defaultUserPic : res.photoURL,
              isDM: res.idDM,
              userId: res.userId
            }
            this.props.dispatch(setAuthedUser(authedUserData))
            this.props.dispatch(handleInitialData(res.userId, res.jwt))
            this.props.history.push({
              pathname: '/dashboard/characters'
            })
          })
          .catch(e => {
            alert('Whoops something went wrong... \n\nPlease try again later')
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
      <MDBContainer className='centered'>
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
                {this.state.serverError && (
                  <MDBAlert color='danger'>
                    <MDBIcon icon='warning' />
                    &nbsp;&nbsp;&nbsp;{this.state.serverErrorMessage}
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

function mapStateToProps({ User }) {
  return {
    User
  }
}

export default connect(mapStateToProps)(Signup)
