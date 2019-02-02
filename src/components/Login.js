import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBModalFooter, MDBAlert, MDBIcon} from 'mdbreact';
import logo from '../logo.svg'
import * as API from '../utils/api'
import FacebookLogin from 'react-facebook-login';
import config from '../config.json';
import { setAuthedUser } from '../actions/authedUser'
import { handleInitialData } from '../actions/shared'
import { connect } from 'react-redux'
import { verifyToken } from '../utils/misc'

class Login extends React.Component {
  state = {
    email:'',
    password:'',
    authError: false
  }

  componentWillMount () {
    const token = localStorage.getItem('DNDTOKEN')
    if (token)  {
      verifyToken(token)
       .then((authedUser) => {
         if (authedUser) {
           this.props.dispatch(setAuthedUser(authedUser.email, "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png", authedUser.isDM, authedUser._id))
           this.props.dispatch(handleInitialData(authedUser._id, token))
           this.props.history.push({
             pathname: '/dashboard/characters'
           })
         } else {
           localStorage.removeItem('DNDTOKEN')
           this.props.history.push({
             pathname: '/'
           })
         }
       })
    }

  }

  handleChangeEmail = (email) => {
    this.setState({
      email
    })
  }

  handleChangePassword = (password) => {
    this.setState({
      password
    })
  }

  handleLogin = () => {
    API.login(this.state)
    .then((res) => {
      if(res.status.code === 200) {
        localStorage.setItem('DNDTOKEN', res.jwt);
        this.props.dispatch(setAuthedUser(res.email, "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png", res.isDM, res.userId))
        this.props.dispatch(handleInitialData(res.userId, res.jwt))
        this.props.history.push({
          pathname: '/dashboard/characters',
        });
      } else {
        this.setState({
          authError: true
        })
      }
    })
  }

  handleKeyDown = (event) => {
    switch (event.key) {
      case 'Enter':
        this.handleLogin()
        break
      default:
        break
    }
  }

  handleFBLogin = (res) => {
    const profilePic = res.picture.data.url
    API.fbLogin(res.accessToken)
     .then((res) => {
       if(res.status.code === 200) {
         console.log("Login with Fb successful")
         localStorage.setItem('DNDTOKEN', res.jwt);
         this.props.dispatch(setAuthedUser(res.email, profilePic, res.isDM, res.userId))
         this.props.dispatch(handleInitialData(res.userId, res.jwt))
         this.props.history.push({
           pathname: '/dashboard/characters',
         })
       }
     }
   ).catch( err => console.warn(err))
  }

  render() {
    return (
      <div>
        {(this.props.User.authenticated || !localStorage.getItem('DNDTOKEN'))
          && (
          <MDBContainer className='centered'>
            <MDBRow className="d-flex justify-content-center">
              <MDBCol md="6">
                <MDBCard>
                  <MDBCardBody className="mx-4" >
                    <div className="text-center">
                      <h3 className="deep-orange-text mb-5">
                        <strong>D&D Turn Tracker</strong>
                      </h3>
                    </div>
                    <img alt='DnD Turn Tracker Logo' src={logo}/>
                      { this.state.authError && (
                        <MDBAlert  color="danger" >
                          <MDBIcon icon="warning" />
                          &nbsp;&nbsp;&nbsp;Error Logging In
                        </MDBAlert>
                      )}
                    <MDBInput
                      label="Your email"
                      group
                      type="email"
                      validate
                      success="right"
                      error="Whoops!"
                      getValue={(e) => this.handleChangeEmail(e)}
                    />
                    <MDBInput
                      label="Your password"
                      group
                      type="password"
                      validate
                      containerClass="mb-0"
                      onKeyDown = {(e) => this.handleKeyDown(e)}
                      getValue={(e) => this.handleChangePassword(e)}
                    />
                    <p className="font-small blue-text d-flex justify-content-end pb-3">
                      Forgot
                      <a href="#!" className="blue-text ml-1">

                        Password?
                      </a>
                    </p>
                    <div className="text-center mb-3">
                      <MDBBtn
                        type="button"
                        gradient="peach"
                        rounded
                        className="btn-block z-depth-1a"
                        onClick={() => this.handleLogin()}
                      >
                        Sign in
                      </MDBBtn>
                    </div>
                    <MDBRow className="mt-2 mb-3 d-flex justify-content-center">
                        <FacebookLogin
                          appId={config.FACEBOOK_APP_ID}
                          fields="name,email,picture"
                          callback={this.handleFBLogin}
                          icon="fa-facebook"
                          size="small"
                          cssClass="my-facebook-button-class"
                          textButton=" Continue with Facebook"
                        />
                  </MDBRow>
                  </MDBCardBody>
                  <MDBModalFooter className="mx-5 pt-3 mb-1">
                    <p className="font-small grey-text d-flex justify-content-end">
                      Not a member?
                      <a href="/signup" className="blue-text ml-1">

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
    );
  }
};

function mapStateToProps({ User }) {
  return {
    User
  }

}

export default connect(mapStateToProps)(Login)
