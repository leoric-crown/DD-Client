import React, {Component} from 'react'
import { MDBContainer, MDBCard, MDBCardBody, MDBBtn } from 'mdbreact';

const style={
  "marginRight":"0%",
  "marginLeft":"0%",
}

class MyCharacters extends Component {

  getStyling = () => {
    if(this.props.length === 1) {
      return {
        "marginRight":"25%",
        "marginLeft":"25%",
      }
    } else {
      return style
    }
  }
  render() {
    return(
      <MDBContainer className="">
          <MDBCard style={this.getStyling()}  className="character-container">
            <MDBCardBody>
              <div>
                <h3 className="black-text mb-5">
                  <strong>{this.props.character.name}</strong>
                </h3>
              </div>
              <div className="text-center mb-3">
                <img className="character-pic rounded-circle z-depth-0" alt='DnD Turn Tracker Logo' src={this.props.character.picUrl}/>
              </div>
              <div className="character-specs mb-3">
                <h5>Level: {this.props.character.level}</h5>
                <h5>Armor Class: {this.props.character.armorclass}</h5>
                <h5>Hitpoints: {this.props.character.hitpoints}</h5>
                <h5>Max Hit Points: {this.props.character.maxhitpoints}</h5>
              </div>
              <div className="text-center mb-3">
                <MDBBtn
                  type="button"
                  rounded
                  color="black"
                  className="btn-block z-depth-1a black"
                  onClick={() => console.log("Clicked")}
                >
                  Edit
                </MDBBtn>
              </div>
            </MDBCardBody>
          </MDBCard>
      </MDBContainer>
    )
  }
}

export default MyCharacters
