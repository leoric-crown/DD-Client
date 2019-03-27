import React, { Component } from 'react'
import { MDBContainer, MDBCard, MDBCardBody, MDBIcon } from 'mdbreact';
import "font-awesome/css/font-awesome.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import config from '../../config';
import { connect } from 'react-redux'
import { deleteCharacter } from '../../redux/actions/characters'
import { bulkDeleteInitiatives } from '../../redux/actions/initiatives'
import CharacterForm from './form/CharacterForm'
import MyMDBModal from '../modal/MDBModal.js';

class MyCharacters extends Component {
   state = {
      updating: false
   }

   handleDelete = () => {
      if (this.props.character.player) {
         const characterInitiatives = this.props.Initiatives.list.filter(i => {
            return i.characterStamp._id === this.props.character._id
         })
         if (characterInitiatives.length > 0) {
            alert('deleting character initiatives...')
            this.props.dispatch(bulkDeleteInitiatives(
               localStorage.getItem('DNDTOKEN'), {
                  list: characterInitiatives.map(i => i._id)
               },
               () => {
                  this.props.dispatch(deleteCharacter(
                     localStorage.getItem('DNDTOKEN'),
                     this.props.character._id)
                  )
               }
            ))
         } else {
            this.props.dispatch(deleteCharacter(
               localStorage.getItem('DNDTOKEN'),
               this.props.character._id)
            )
         }
      } else {
         this.props.dispatch(deleteCharacter(
            localStorage.getItem('DNDTOKEN'),
            this.props.character._id)
         )
      }


   }

   toggleModal = () => {
      this.setState({
         updating: !this.state.updating
      })
   }

   render() {
      const { character } = this.props
      return (
         <React.Fragment>
            {this.state.updating &&
               <MyMDBModal
                  toggle={this.toggleModal}
                  isOpen={true}
                  position="center"
                  canConfirm={false}
                  labels={{
                     header: 'Create Character',
                     confirm: 'Insert Character'
                  }}
               >
                  <CharacterForm
                     character={character}
                     done={() => this.setState({ updating: false })}
                  />
               </MyMDBModal>

            }
            <MDBContainer className="">
               <MDBCard style={{ backgroundColor: 'white' }} className="card-container">
                  <MDBCardBody>
                     <div className='card-top'>
                        <strong
                           className="card-title"
                           title={character.name}>
                           {character.name}
                        </strong>
                        <div className="card-actions">
                           <MDBIcon
                              className="card-actions-item"
                              onClick={() => this.toggleModal()}
                              icon="pencil"
                              size="lg" />
                           <MDBIcon
                              className="card-actions-item"
                              onClick={this.handleDelete}
                              icon="trash"
                              size="lg" />
                        </div>
                     </div>
                     <div className="text-center">
                        <img
                           className="card-pic rounded-circle z-depth-0 lg"
                           alt='DnD Turn Tracker Logo'
                           src={`${config.API}/${character.picUrl}`} />
                     </div>
                     <div className="card-item-fields">
                        <h5>
                           <MDBIcon icon="user" size="lg" className="pr-3" />
                           <strong className="card-item-fields-label">&nbsp;Level:</strong>
                           {character.level}
                        </h5>
                        <h5>
                           <MDBIcon
                              icon="shield"
                              size="lg"
                              className="pr-3"
                           />
                           <strong className="card-item-fields-label">
                              &nbsp;Armor Class:
                        </strong>
                           {character.armorclass}
                        </h5>
                        {character.player && (
                           <div>
                              <h5>
                                 <MDBIcon
                                    icon="heartbeat"
                                    size="lg"
                                    className="pr-3"
                                 />
                                 <strong className="card-item-fields-label">
                                    Hitpoints:
                             </strong>
                                 {character.hitpoints}
                              </h5>
                           </div>
                        )}
                        <h5>
                           <MDBIcon
                              icon="heart"
                              size="lg"
                              className="pr-3"
                           />
                           <strong className="card-item-fields-label">
                              Max Hit Points:
                     </strong>
                           {character.maxhitpoints}
                        </h5>
                        <h5>
                           <MDBIcon
                              icon="user"
                              size="lg"
                              className="pr-3"
                           />
                           <strong className="card-item-fields-label">
                              Player:
                          </strong>
                           {character.player ? 'Yes' : 'No'}</h5>
                     </div>
                  </MDBCardBody>
               </MDBCard>
            </MDBContainer>
         </React.Fragment>
      )
   }
}

function mapStateToProps({ Initiatives }) {
   return {
      Initiatives
   }
}

export default connect(mapStateToProps)(MyCharacters)
