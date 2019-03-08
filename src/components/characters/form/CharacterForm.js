import React, { Component } from 'react'
import {
   MDBContainer,
   MDBRow,
   MDBCol,
   MDBCard,
   MDBCardBody,
   MDBInput,
   MDBBtn,
   MDBIcon,
   MDBAlert
} from 'mdbreact'
import { connect } from 'react-redux'
import { postCharacter, patchCharacter } from '../../../redux/actions/characters'
import validator from 'validator'
import { validateAll } from 'indicative'
import CharacterLevelSelect from './CharacterLevelSelect'
import CharacterAcSelect from './CharacterAcSelect';
import { GiSpikedDragonHead } from "react-icons/gi";

class CharacterForm extends Component {
   constructor(props) {
      super(props)
      const updating = this.props.character ? this.props.character : false
      const {
         name,
         level,
         armorclass,
         hitpoints,
         maxhitpoints,
         player
      } = updating
      const { User } = this.props
      this.state = {
         updating,
         name: updating ? name : '',
         level: updating ? level : 1,
         armorclass: updating ? armorclass : 10,
         hitpoints: updating ? hitpoints : '',
         maxhitpoints: updating ? maxhitpoints : '',
         url: '',
         characterPic: null,
         player: User.isDM ? updating ? player : false : true,
         errors: {}
      }
   }

   handleKeyDown = event => {
      switch (event.key) {
         case 'Enter':
            this.handleSubmit(this.props.toggleButtonNavigation)
            break
         case 'Escape':
            this.handleCancel()
            break
         default:
            break
      }
   }

   handleChange = (type, value) => {
      const newState = {}
      newState[type] = value
      this.setState({
         ...newState
      })
   }

   handleCreate = toggleCharacterNavigation => {
      const data = this.state

      const rules = {
         name: 'required|string',
         maxhitpoints: 'required|number'
      }

      const messages = {
         required: 'Please fill in the {{ field }} field',
         'maxhitpoints.number': 'Please type in a valid number'
      }

      validateAll(data, rules, messages)
         .then(() => {
            let picUrl = ''
            if (!validator.isURL(this.state.url)) {
               picUrl = null
            } else {
               picUrl = this.state.url
            }
            const payload = {
               name: this.state.name,
               level: this.state.level,
               armorclass: this.state.armorclass,
               player: this.state.player,
               maxhitpoints: this.state.maxhitpoints,
               user: this.props.User._id,
               characterPic: this.state.characterPic
                  ? this.state.characterPic
                  : picUrl
            }

            this.props.dispatch(
               postCharacter(localStorage.getItem('DNDTOKEN'), payload)
            )
            toggleCharacterNavigation('Submit_Character')
         })
         .catch(errors => {
            const formattedErrors = {}
            errors.forEach(error => (formattedErrors[error.field] = error.message))
            this.setState({
               errors: formattedErrors
            })
         })
   }

   handleUpdate = () => {
      const {
         updating,
         characterPic,
         style,
         levelOptions,
         armorClassOptions,
         url,
         ...changedCharacter
      } = this.state
      const fieldsToUpdate = Object.entries(changedCharacter)
         .filter(([key, value]) => {
            return updating[key] !== value
         })
         .map(([propName, value]) => {
            return {
               propName,
               value
            }
         })
      if (fieldsToUpdate.length > 0) {
         const maxHpIndex = fieldsToUpdate
            .map(op => op.propName)
            .indexOf('maxhitpoints')
         if (maxHpIndex > -1 && !updating.player)
            fieldsToUpdate.push({
               propName: 'hitpoints',
               value: fieldsToUpdate[maxHpIndex].value
            })
         this.props.dispatch(
            patchCharacter(
               localStorage.getItem('DNDTOKEN'),
               fieldsToUpdate,
               updating.request.url
            )
         )
      } else {
         this.handleCancel()
      }
   }

   handleSubmit = toggleCharacterNavigation => {
      if (!this.state.updating) {
         this.handleCreate(toggleCharacterNavigation)
      } else {
         this.handleUpdate()
      }
      if (this.props.done) this.props.done()
   }

   handleCancel = () => {
      if (this.props.done) this.props.done()
   }

   render() {
      const {
         name,
         level,
         armorclass,
         hitpoints,
         maxhitpoints,
         player
      } = this.state
      const { toggleButtonNavigation } = this.props
      const { User } = this.props
      return (
         <MDBContainer>
            <MDBRow className='d-flex justify-content-center'>
               <MDBCol md='8'>
                  <MDBCard>
                     <MDBCardBody className='mx-4 d-row'>
                        <div className='text-center'>
                           <h3 className='mb-5'>
                              <strong>
                                 &nbsp;
                      {this.state.updating ? (
                                    `Edit '${this.state.updating.name}'`
                                 ) : (
                                       <GiSpikedDragonHead
                                       size='5em'
                                       color='#8A0300'
                                       />
                                    )}
                              </strong>
                           </h3>
                        </div>
                        <MDBInput
                           label='Name'
                           group
                           containerClass='mb-0'
                           required={true}
                           onChange={e =>
                              this.handleChange('name', e.target.value)
                           }
                           onKeyDown={e =>
                              this.handleKeyDown(e)
                           }
                           value={name}
                        />
                        {this.state.errors.name && (
                           <MDBAlert color='danger'>
                              <MDBIcon icon='warning' />
                              &nbsp;&nbsp;&nbsp;{this.state.errors.name}
                           </MDBAlert>
                        )}
                        <CharacterLevelSelect
                           value={level}
                           onChange={value =>
                              this.handleChange('level', value)
                           }
                        />
                        <CharacterAcSelect
                           value={armorclass}
                           onChange={value =>
                              this.handleChange('armorclass', value)
                           }
                        />
                        {this.state.updating && this.state.updating.player && (
                           <MDBInput
                              label='Hitpoints'
                              containerClass='mb-0'
                              onChange={e =>
                                 this.handleChange('hitpoints', e.target.value)
                              }
                              onKeyDown={e => this.handleKeyDown(e)}
                              value={hitpoints.toString()}
                           />
                        )}
                        <MDBInput
                           label='Max Hitpoints'
                           containerClass='mb-0'
                           onChange={e =>
                              this.handleChange('maxhitpoints', e.target.value)
                           }
                           onKeyDown={e => this.handleKeyDown(e)}
                           value={maxhitpoints.toString()}
                        />
                        {this.state.errors.maxhitpoints && (
                           <MDBAlert color='danger'>
                              <MDBIcon icon='warning' />
                              &nbsp;&nbsp;&nbsp;{this.state.errors.maxhitpoints}
                           </MDBAlert>
                        )}
                        {User.isDM && (
                           <MDBInput
                              label='Player Character'
                              type='checkbox'
                              id='checkbox'
                              onChange={e =>
                                 this.handleChange('player', e.target.checked)
                              }
                              checked={player}
                           />
                        )}
                        {!this.state.updating && (
                           <div>
                              <MDBInput
                                 label='Photo URL'
                                 className='text-center'
                                 containerClass='mb-0'
                                 onChange={e =>
                                    this.handleChange('url', e.target.value)
                                 }
                                 onKeyDown={e => this.handleKeyDown(e)}
                              />
                              <MDBInput
                                 type='file'
                                 containerClass='mb-0'
                                 onChange={e =>
                                    this.handleChange('file', e.target.files[0])
                                 }
                                 onKeyDown={e => this.handleKeyDown(e)}
                              />
                           </div>
                        )}
                        <br />
                        <div className='text-center'>
                           <MDBBtn
                              type='button'
                              rounded
                              className='btn-block z-depth-1a form-btn'
                              onClick={() =>
                                 this.handleSubmit(toggleButtonNavigation)
                              }
                           >
                              {this.state.updating ? 'Save' : 'Create'}
                           </MDBBtn>
                        </div>
                        <br />
                        {this.state.updating && (
                           <div className='text-center'>
                              <MDBBtn
                                 type='button'
                                 rounded
                                 color='black'
                                 className='btn-block z-depth-1a'
                                 onClick={() => this.handleCancel()}
                              >
                                 Cancel
                              </MDBBtn>
                           </div>
                        )}
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

export default connect(mapStateToProps)(CharacterForm)
