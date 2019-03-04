import React, { Component } from 'react'
import { MDBContainer, MDBCard, MDBCardBody, MDBIcon } from 'mdbreact';
import "font-awesome/css/font-awesome.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import config from '../../config.json';
import { connect } from 'react-redux'
import { deleteCharacter } from '../../redux/actions/characters'

class MyCharacters extends Component {
   handleDelete = () => {
      /* TODO: If the Character is a Player Character and is in any Encounter, warn the user.
               Don't allow non-DM users to delete Characters which are in any Encounter.
               Give DM option to delete anyway and also delete that Character's records from Initiatives
      */
      this.props.dispatch(deleteCharacter(localStorage.getItem('DNDTOKEN'), this.props.character._id))
   }

   render() {
      const { character } = this.props
      return (
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
                           onClick={() => this.props.onEdit(character)}
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
      )
   }
}

export default connect()(MyCharacters)
