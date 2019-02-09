import React, { Component } from 'react'
import { MDBContainer, MDBCard, MDBCardBody, MDBBtn, MDBIcon } from 'mdbreact';
import "font-awesome/css/font-awesome.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import config from '../config.json';
import { connect } from 'react-redux'
import { startEditCharacter, deleteCharacter } from '../actions/characters'

const ONE_ITEM = 1
const TWO_ITEMS = 2


class MyCharacters extends Component {
  // Hack in case we only have one or two Characters
  // In the grid
  getStyling = () => {
    if (this.props.length === ONE_ITEM) {
      return {
        "width": "31.250em",
      }
    } else if (this.props.length === TWO_ITEMS) {
      return {
        "width": "21.875em",
      }
    } else {
      return
    }
  }

  handleEdit = () => {
    this.props.dispatch(startEditCharacter(this.props.character))
  }

  handleDelete = () => {
    this.props.dispatch(deleteCharacter(localStorage.getItem('DNDTOKEN'), this.props.character._id))
  }

  render() {
    return (
      <MDBContainer className="">
        <MDBCard style={this.getStyling()} className="character-container">
          <MDBCardBody>
            <div>
              <h3 className="black-text mb-5">
                <strong className="character-name">{this.props.character.name}</strong>
              </h3>
            </div>
            <div className="text-center mb-3">
              <img className="character-pic rounded-circle z-depth-0 lg" alt='DnD Turn Tracker Logo' src={`${config.API}/${this.props.character.picUrl}`} />
            </div>
            <div className="character-specs mb-3">
              <h5><MDBIcon icon="user" size="lg" className="red-text pr-3" /><strong className="character-stats">&nbsp;Level:</strong> {this.props.character.level}</h5>
              <h5><MDBIcon icon="shield" size="lg" className="red-text pr-3" /><strong className="character-stats">&nbsp;Armor Class:</strong> {this.props.character.armorclass}</h5>
              <h5><MDBIcon icon="heartbeat" size="lg" className="red-text pr-3" /><strong className="character-stats">Hitpoints:</strong> {this.props.character.hitpoints}</h5>
              <h5><MDBIcon icon="heart" size="lg" className="red-text pr-3" /><strong className="character-stats">Max Hit Points:</strong> {this.props.character.maxhitpoints}</h5>
            </div>
            <div className="text-center mb-3">
              <MDBBtn
                type="button"
                rounded
                color="black"
                className="btn-block z-depth-1a black character-stats"
                onClick={this.handleEdit}
              >
                Edit
                </MDBBtn>
            </div>
            <br/>
            <div className="text-center mb-3">
              <MDBBtn
                type="button"
                rounded
                color="black"
                className="btn-block z-depth-1a black character-stats"
                onClick={this.handleDelete}
              >
                Delete
                </MDBBtn>
            </div>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    )
  }
}

export default connect()(MyCharacters)
