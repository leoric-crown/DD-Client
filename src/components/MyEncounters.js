import React, { Component } from 'react'
import { MDBContainer, MDBCard, MDBCardBody, MDBBtn, MDBIcon } from 'mdbreact';
import "font-awesome/css/font-awesome.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import config from '../config.json';
import { connect } from 'react-redux'
import { startEditEncounter, deleteEncounter } from '../actions/encounters'

const ONE_ITEM = 1
const TWO_ITEMS = 2


class MyEncounters extends Component {
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
    this.props.dispatch(startEditEncounter(this.props.encounter))
  }

  handleDelete = () => {
    this.props.dispatch(deleteEncounter(localStorage.getItem('DNDTOKEN'), this.props.encounter._id))
  }

  render() {
    const { encounter } = this.props
    return (
      <MDBContainer className="">
        <MDBCard style={this.getStyling()} className="character-container">
          <MDBCardBody>
            <div>
              <h3 className="black-text mb-5">
                <strong className="character-name">{encounter.name}</strong>
              </h3>
            </div>
            <div className="text-center mb-3">
              <img className="character-pic rounded-circle z-depth-0 lg" alt='DnD Turn Tracker Logo' src={`https://assetstorev1-prd-cdn.unity3d.com/package-screenshot/3f8958b2-0d97-487e-86b8-07281543baf7_scaled.jpg`} />
            </div>
            <div className="character-specs mb-3">
              <h5><MDBIcon icon="user" size="lg" className="red-text pr-3" /><strong className="character-stats">&nbsp;Name:</strong> {encounter.name}</h5>
              <h5><MDBIcon icon="heart" size="lg" className="red-text pr-3" /><strong className="character-stats">&nbsp;Status:</strong> {encounter.status}</h5>
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

export default connect()(MyEncounters)
