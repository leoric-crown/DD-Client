import React, { Component } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact'
import { patchUser } from '../../redux/actions/authedUser';
import { withRouter } from 'react-router-dom'

class UserForm extends Component {
   constructor(props) {
      super(props)
      const { firstName, lastName, isDM } = this.props.user
      this.state = {
         updating: {
            firstName,
            lastName,
            isDM
         }
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
      console.log('handleinputchange', type, value)
      const { updating } = this.state
      updating[type] = value
      this.setState({
         updating
      })
   }

   handleSubmit = () => {
      const { updating } = this.state
      const { user } = this.props

      const fieldsToUpdate = Object.entries(updating).filter(([propName, value]) => {
         console.log('propName: '+propName, user[propName], value)
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
         this.props.history.push({
            pathname: '/'
         })
      } else {
         const { firstName, lastName, isDM } = this.props.user
         this.setState({
            updating: {
               firstName,
               lastName,
               isDM
            }
         })
      }
   }

   handleClose = () => {
      this.props.history.push({
         pathname: '/'
      })
   }

   render() {
      console.log(this.state, this.props)
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
                     <br/>
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