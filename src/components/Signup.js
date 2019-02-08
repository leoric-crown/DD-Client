import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBAlert, MDBIcon } from 'mdbreact';
import * as API from '../utils/api'
import * as EmailValidator from 'email-validator'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import { setAuthedUser } from '../actions/authedUser'

const defaultUserPic = "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png"

class Signup extends React.Component {
  state = {
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    emailIsValid: true,
    passwordsMatch: true,
    validEmail: true,
    emailErrorMessage: 'Invalid Email',
    passwordErrorMessage: 'Password do not match',
    serverError: false,
    serverErrorMessage: '',
    readyForSubmit: false
  }

  validateInput = (type) => {

  }

  handleChange = (type, value) => {
    switch (type) {
      case 'name':
        this.setState({
          name: value
        })
        break
      case 'email':
        this.setState({
          email: value
        })
        break
      case 'password':
        this.setState({
          password: value
        })
        break;
      case 'passwordConfirm':
        this.setState({
          passwordConfirm: value
        })
        break
      default:
        return;
    }

    if (this.state.name
      && this.state.email
      && this.state.password
      && this.state.passwordConfirm
    ) {
      this.setState({
        readyForSubmit: true
      })
    }

  }


  handleLogin = () => {
    if (this.state.password !== this.state.passwordConfirm) {
      this.setState({
        'passwordsMatch': false
      })
      return
    }

    if (!EmailValidator.validate(this.state.email)) {
      this.setState({
        'validEmail': false
      })
      return
    }

    const payload = {
      "email": this.state.email,
      "password": this.state.password
    }

    API.signup(payload)
      .then((res) => {
        if (res.error) {
          this.setState({
            serverError: true,
            serverErrorMessage: res.message
          })
        }
        this.props.dispatch(setAuthedUser(res.email, !res.photoUrl ? defaultUserPic : res.photoUrl, res.isDM, res.userId))
        this.props.dispatch(handleInitialData(res.userId, res.jwt))
        this.props.history.push({
          pathname: '/dashboard/characters',
        });
      })
      .catch((e) => {
        console.log("Error:", e)
      })



  }

  render() {
    return (
      <MDBContainer className='centered'>
        <MDBRow className="d-flex justify-content-center">
          <MDBCol md="6">
            <MDBCard>
              <MDBCardBody className="mx-4 d-row" >
                <div className="text-center">
                  <h3 className="deep-orange-text mb-5">
                    <MDBIcon onClick={() =>
                      this.props.history.push({
                        pathname: '/',
                      })}
                      icon="arrow-left" />
                    <strong>
                      &nbsp;Signup
                    </strong>
                  </h3>
                </div>
                {this.state.serverError && (
                  <MDBAlert color="danger" >
                    <MDBIcon icon="warning" />
                    &nbsp;&nbsp;&nbsp;{this.state.serverErrorMessage}
                  </MDBAlert>
                )}
                <MDBInput
                  label="Your name"
                  icon='user'
                  group
                  containerClass="mb-0"
                  required={true}
                  getValue={(e) => this.handleChange("name", e)}
                />
                <MDBInput
                  label="Your email"
                  icon="envelope"
                  group
                  type="email"
                  getValue={(e) => this.handleChange("email", e)}
                />
                {!this.state.validEmail && (
                  <MDBAlert color="danger" >
                    <MDBIcon icon="warning" />
                    &nbsp;&nbsp;&nbsp;Invalid Email

                    </MDBAlert>
                )}
                <MDBInput
                  label="Password"
                  type="password"
                  icon='lock'
                  containerClass="mb-0"
                  getValue={(e) => this.handleChange("password", e)}
                />
                <MDBInput
                  label="Confirm Password"
                  type="password"
                  icon='check'
                  containerClass="mb-0"
                  getValue={(e) => this.handleChange("passwordConfirm", e)}
                />
                {!this.state.passwordsMatch && (
                  <MDBAlert color="danger" >
                    <MDBIcon icon="warning" />
                    &nbsp;&nbsp;&nbsp;{this.state.passwordErrorMessage}
                  </MDBAlert>
                )}
                <br />
                <div className="text-center mb-3">
                  {this.state.readyForSubmit && (
                    <MDBBtn
                      type="button"
                      gradient="peach"
                      rounded
                      className="btn-block z-depth-1a"
                      onClick={() => this.handleLogin()}
                    >
                      Register
                      </MDBBtn>
                  )}

                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
};

function mapStateToProps({ User }) {
  return {
    User
  }

}

export default connect(mapStateToProps)(Signup)
