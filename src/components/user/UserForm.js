import React, { Component } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBAlert, MDBIcon } from 'mdbreact'
import { patchUser } from '../../redux/actions/authedUser';
import { withRouter } from 'react-router-dom'
import { validateAll } from 'indicative'

class UserForm extends Component {
   constructor(props) {
      super(props)
      const { firstName, lastName, isDM } = this.props.user
      this.state = {
         updating: {
            firstName,
            lastName,
            isDM
         },
         errors: {}
      }
   }

   handleKeyDown = event => {
      switch (event.key) {
         case 'Enter':
            this.handleSubmit()
            break
         default:
            break
      }
   }

   handleInputChange = (type, value) => {
      const { updating } = this.state
      updating[type] = value
      this.setState({
         updating
      })
   }

   handleSubmit = () => {
      const { updating } = this.state
      const { user } = this.props

      const rules = {
         firstName: 'required|string'
      }
      const messages = {
         'firstName.required': 'The First Name field is required'
      }

      validateAll(updating, rules, messages)
         .then(() => {
            this.setState({
               errors: {}
            })

            const fieldsToUpdate = Object.entries(updating).filter(([propName, value]) => {
               return (user[propName] !== value)
            }).map(([propName, value]) => {
               return {
                  propName,
                  value
               }
            })
            if (fieldsToUpdate.length > 0) {
               this.props.dispatch(
                  patchUser(
                     localStorage.getItem('DNDTOKEN'),
                     fieldsToUpdate,
                     this.props.user.request.url
                  )
               )
               this.props.history.goBack()
            }
         })
         .catch(errors => {
            const formattedErrors = {}
            errors.forEach(error => (formattedErrors[error.field] = error.message))
            this.setState({
               errors: formattedErrors
            })
            return
         })
   }

   handleClose = () => {
      this.props.history.goBack()
   }

   render() {
      const { user } = this.props
      return (
         <MDBContainer>
            <MDBRow className="d-flex justify-content-center">
               <MDBCol md="8">
                  <br />
                  <div className="text-center">
                     <img className="card-pic rounded-circle z-depth-0 lg" alt='DnD Turn Tracker Logo' src={`${user.photoURL}`} />
                  </div>
                  <h2 className="text-center">{user.email}</h2>
                  <MDBInput
                     label="First Name"
                     required={true}
                     onChange={(e) => this.handleInputChange('firstName', e.target.value)}
                     onKeyDown={this.handleKeyDown}
                     value={this.state.updating.firstName}
                  />
                  {this.state.errors.firstName && (
                     <MDBAlert color='danger'>
                        <MDBIcon icon='warning' />
                        &nbsp;&nbsp;&nbsp;{this.state.errors.firstName}
                     </MDBAlert>
                  )}
                  <MDBInput
                     label="Last Name"
                     required={true}
                     onChange={(e) => this.handleInputChange('lastName', e.target.value)}
                     onKeyDown={this.handleKeyDown}
                     value={this.state.updating.lastName}
                  />
                  <MDBInput
                     label="Is DM"
                     className="mycheckbox"
                     type="checkbox"
                     id="checkbox"
                     onChange={(e) => this.handleInputChange('isDM', e.target.checked)}
                     checked={this.state.updating.isDM}
                  />
                  <div className='text-center'>
                     <MDBBtn
                        type='button'
                        rounded
                        color='black'
                        className='btn-block z-depth-1a'
                        onClick={() => this.handleSubmit()}
                     >
                        Save Changes
                     </MDBBtn>
                     <br />
                     <MDBBtn
                        type='button'
                        rounded
                        color='black'
                        className='btn-block z-depth-1a'
                        onClick={() => this.handleClose()}
                     >
                        Close
                     </MDBBtn>
                  </div>
               </MDBCol>
            </MDBRow>
         </MDBContainer>
      )
   }
}

export default withRouter(UserForm)