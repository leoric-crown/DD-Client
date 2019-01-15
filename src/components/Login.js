import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBModalFooter, MDBAlert, MDBIcon} from 'mdbreact';
import logo from '../logo.svg'
import * as API from '../utils/api'
import FacebookLogin from 'react-facebook-login';
import config from '../config.json';

class Login extends React.Component {
  state = {
    email:'',
    password:'',
    authError: false
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

  handleClick = () => {
    console.log("Wooo")
  }

  handleLogin = () => {
    API.login(this.state)
    .then((res) => {
      if(res.status === 200) {
        // TODO: save token in localstorage to make future requests to API
        this.props.history.push({
          pathname: '/dashboard',

        })
      } else {
        this.setState({
          authError: true
        })
      }
    }).catch((e) => {
      console.log(e)
    })
  }

  handleFBLogin = (res) => {
    console.log(res);
    // TODO: send access Token returned by fb to express endpoint
  }

  render() {
    return (
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
    );
  }
};

export default Login;
