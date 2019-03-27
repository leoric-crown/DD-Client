import React from 'react'
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBBtn,
  MDBModalFooter,
  MDBAlert,
  MDBIcon
} from 'mdbreact'
import FacebookLogin from 'react-facebook-login'
import config from '../../config'
import { handleLogin, handleFBLogin } from '../../redux/actions/shared'
import { connect } from 'react-redux'
import { checkToken } from '../../utils/misc'
import { validateAll } from 'indicative'
import { clearErrors } from '../../redux/actions/errors'

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    flashMessage: false,
    message: '',
    errors: {}
  }

  setMessage = () => {
    if (this.props.User.message) {
      this.setState({
        flashMessage: true,
        message: this.props.User.message
      })
    }
  }

  componentWillMount() {
    const token = localStorage.getItem('DNDTOKEN')
    if (token) checkToken.bind(this)(token)
  }

  componentWillReceiveProps() {
    this.setMessage()
  }

  componentDidMount() {
    this.setMessage()
  }

  handleInputChange = (type, value) => {
    this.setState({
      [type]: value
    })
  }

  handleLogin = () => {
    // We clear previous errors to avoid confusion
    this.props.dispatch(clearErrors())

    const data = this.state
    const rules = {
      email: 'required|email',
      password: 'required|string'
    }

    const messages = {
      required: 'Please fill in the {{ field }} field',
      'email.email': 'Please type a valid email'
    }

    validateAll(data, rules, messages)
      .then(() => {
        // We set errors to empty object to clear previous errors
        this.setState({
          errors: {}
        })
        this.props.dispatch(handleLogin(this.state))
          .then(() => {
            if (this.props.Errors.authSuccess) {
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

  handleKeyDown = event => {
    switch (event.key) {
      case 'Enter':
        this.handleLogin()
        break
      default:
        break
    }
  }

  handleFBLogin = res => {
    this.props.dispatch(handleFBLogin(res.accessToken))
      .then(() => {
        if (this.props.Errors.authSuccess) {
          this.props.history.push({
            pathname: '/characters'
          })
        }
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
      <div>
        <div>
          {this.state.flashMessage && (
            <MDBAlert color='danger'>
              <h4 className='alert-heading flash-message'>
                <strong>{this.state.message}</strong>
              </h4>
            </MDBAlert>
          )}
        </div>
        {(!this.props.User.authenticated ||
          !localStorage.getItem('DNDTOKEN')) && (
            <MDBContainer className='login-signup'>
              <br />
              <br />
              <br />
              <br />
              <MDBRow className='d-flex justify-content-center'>
                <MDBCol md='6'>
                  <MDBCard>
                    <MDBCardBody className='mx-4'>
                      <div className='d-flex justify-content-center'>
                        <img
                          alt='DnD Turn Tracker Logo'
                          style={{ width: '75%', height: '75%' }}
                          src='https://cdn.pixabay.com/photo/2017/08/31/04/01/d20-2699387_960_720.png'
                        />
                      </div>
                      <div className='text-center'>
                        <h3 className=''>
                          <strong>Turn Tracker</strong>
                        </h3>
                      </div>
                      {this.props.Errors.authErrorMessage && (
                        <MDBAlert color='danger'>
                          <MDBIcon icon='warning' />
                          {`  ${this.props.Errors.authErrorMessage}`}
                        </MDBAlert>
                      )}
                      <MDBInput
                        label='Your email'
                        name='email'
                        group
                        type='email'
                        validate
                        success='right'
                        error='Whoops!'
                        getValue={e => this.handleInputChange('email', e)}
                      />
                      {this.state.errors.email && (
                        <MDBAlert color='danger'>
                          <MDBIcon icon='warning' />
                          &nbsp;&nbsp;&nbsp;{this.state.errors.email}
                        </MDBAlert>
                      )}
                      <MDBInput
                        label='Your password'
                        group
                        type='password'
                        validate
                        containerClass='mb-0'
                        onKeyDown={e => this.handleKeyDown(e)}
                        getValue={e => this.handleInputChange('password', e)}
                      />
                      {this.state.errors.password && (
                        <MDBAlert color='danger'>
                          <MDBIcon icon='warning' />
                          &nbsp;&nbsp;&nbsp;{this.state.errors.password}
                        </MDBAlert>
                      )}
                      <p className='font-small blue-text d-flex justify-content-end pb-3'>
                        Forgot
                      <a href='/forgotpassword' className='blue-text ml-1'>
                          Password?
                      </a>
                      </p>
                      <div className='text-center mb-3'>
                        <MDBBtn
                          type='button'
                          color='red darken-4'
                          rounded
                          className='btn-block z-depth-1a'
                          onClick={() => this.handleLogin()}
                        >
                          Sign in
                      </MDBBtn>
                      </div>
                      <MDBRow className='mt-2 mb-3 d-flex justify-content-center'>
                        <FacebookLogin
                          appId={config.FACEBOOK_APP_ID}
                          fields='name,email,picture'
                          callback={this.handleFBLogin}
                          icon='fa-facebook'
                          size='small'
                          cssClass='my-facebook-button-class'
                          textButton=' Facebook Login'
                        />
                      </MDBRow>
                    </MDBCardBody>
                    <MDBModalFooter className='mx-5 pt-3 mb-1'>
                      <p className='font-small grey-text d-flex justify-content-end'>
                        Not a member?
                      <a href='/signup' className='blue-text ml-1'>
                          Sign Up
                      </a>
                      </p>
                    </MDBModalFooter>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          )}
      </div>
    )
  }
}

function mapStateToProps({ User, Errors }) {
  return {
    User,
    Errors
  }
}

export default connect(mapStateToProps)(Login)
