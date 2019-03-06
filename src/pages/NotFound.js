import React, { Component } from 'react'
import { MDBBtn } from 'mdbreact'
import { connect } from 'react-redux'
import { checkToken } from '../utils/misc'

class NotFound extends Component {

   componentWillMount() {
      if (!this.props.User.authenticated) {
         const token = localStorage.getItem('DNDTOKEN')
         if (token) {
            checkToken.bind(this)(token)
         } else {
            this.props.history.push({
               pathname: '/'
            })
         }
      }
   }

   render() {
      return (
         <div className='text-center' style={{ paddingTop: '25vh' }}>
            <h1>404</h1>
            <h1>
               Page <code>{this.props.location.pathname}</code> not found!
            </h1>
         </div>

      )
   }
}

function mapStateToProps({ User }) {
   return {
      User
   }
}

export default connect(mapStateToProps)(NotFound)