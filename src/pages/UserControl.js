import React from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon } from 'mdbreact'
import { connect } from 'react-redux'
import { checkToken } from '../utils/misc'
import '../css/Cards.css'

class UserControl extends React.Component {
   state = {

   }

   componentWillMount() {
      if (!this.props.User.authenticated) {
         const token = localStorage.getItem('DNDTOKEN')
         if (token) {
            checkToken.bind(this)(token, '/user')
         } else {
            this.props.history.push({
               pathname: '/'
            })
         }
      }
   }

   render() {
      return (
         <div>
            {true && (
               <React.Fragment>
                  <MDBContainer className="page-with-secondary-nav">
                     <div className="page-heading">
                        <h1 className="page-title">
                           <strong>My User Account</strong>
                        </h1>
                     </div>
                     <div> User Form/Control goes here</div>
                  </MDBContainer>
               </React.Fragment>
            )}
         </div>
      )
   }
}

function mapStateToProps({ User }) {
   return {
      User
   }

}

export default connect(mapStateToProps)(UserControl)
