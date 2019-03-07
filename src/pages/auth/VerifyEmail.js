import React, { Component } from 'react'
import {
   MDBContainer,
   MDBRow,
   MDBCol,
   MDBCard,
   MDBCardBody,
   MDBAlert,
   MDBIcon
} from 'mdbreact'
import { connect } from 'react-redux'
import qs from 'query-string'
import { handleVerifyEmail } from '../../redux/actions/shared'

class VerifyEmail extends Component {
   constructor(props) {
      super(props)
      const token = qs.parse(this.props.location.search, {
         ignoreQueryPrefix: true
      }).token
      if (!token) setTimeout(() => {
         this.props.history.push({
            pathname: '/'
         })
      }, 1000)
      this.state = {
         token: token ? token : null,
         verifyEmailStatus: false
      }
   }

   componentDidMount() {
      this.props.dispatch(handleVerifyEmail(this.state.token))
   }

   componentDidUpdate() {
      if(!this.state.verifyEmailStatus && this.props.Errors.verifyEmail) {
         this.setState({
            verifyEmailStatus: this.props.Errors.verifyEmail
         })
         setTimeout(() => {
            this.props.history.push({
               pathname: '/'
            })
         }, 3000)
      }
   }

   render() {
      const { verifyEmailStatus } = this.state
      console.log(verifyEmailStatus)
      return (
         <MDBContainer className='login-signup'>
            <MDBRow className='d-flex justify-content-center'>
               <MDBCol md='6'>
                  <MDBCard>
                     <MDBCardBody className='mx-4 d-row'>
                        {!verifyEmailStatus &&
                           <div>
                              Verifying your email address...
                           </div>
                        }
                        {verifyEmailStatus && 
                           <MDBAlert color={verifyEmailStatus.success ? 'success' : 'danger'}>
                              <MDBIcon icon={verifyEmailStatus.success ? 'check' : 'warning'}/>
                              &nbsp;&nbsp;&nbsp;
                           {verifyEmailStatus.message}
                           <br/>
                           {verifyEmailStatus.success && 'Redirecting you to login...'}
                           </MDBAlert>
                        }
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

export default connect(mapStateToProps)(VerifyEmail)