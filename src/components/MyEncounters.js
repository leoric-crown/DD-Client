import React, { Component } from 'react'
import { MDBContainer, MDBCard, MDBCardBody, MDBBtn, MDBIcon } from 'mdbreact';
import "font-awesome/css/font-awesome.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { connect } from 'react-redux'
import { startEditEncounter, deleteEncounter, changeActiveEncounter } from '../actions/encounters'

class MyEncounters extends Component {
  state = {
    count: 0
  }

  handleEdit = () => {
    this.props.dispatch(startEditEncounter(this.props.encounter))
  }

  handleDelete = () => {
    this.props.dispatch(deleteEncounter(localStorage.getItem('DNDTOKEN'), this.props.encounter._id))
  }

  handleSetActive = () => {
    this.props.dispatch(changeActiveEncounter(localStorage.getItem('DNDTOKEN'), this.props.encounter._id, this.props.activeEncounter))
  }

  render() {
    const { encounter } = this.props
    return (
      <MDBContainer className="">
        <MDBCard className="character-container">
          <MDBCardBody>
            <div className='card-top'>
              <h3 className="black-text mb-5">
                <strong className="character-name">
                  {encounter.name}
                  &nbsp;
                  {encounter.status === 'Active' && (
                  <MDBIcon className="amber-text" icon="star" size="lg" />
                  )}
                  </strong>
              </h3>
              &nbsp;
              &nbsp;
              &nbsp;
              <div>
                  <MDBIcon style={{cursor:'pointer'}} onClick={this.handleEdit} icon="pencil" size="lg" />
                  &nbsp;
                  &nbsp;
                  <MDBIcon style={{cursor:'pointer'}} onClick={this.handleDelete} icon="trash" size="lg" />
              </div>
            </div>
            <div className="text-center mb-3">
              <img className="character-pic rounded-circle z-depth-0 lg" alt='DnD Turn Tracker Logo' src={`https://assetstorev1-prd-cdn.unity3d.com/package-screenshot/3f8958b2-0d97-487e-86b8-07281543baf7_scaled.jpg`} />
            </div>
            <div className="character-specs mb-3">
              <h5><MDBIcon icon="users" size="lg" className="pr-3" /><strong className="character-stats">&nbsp;Name:</strong> {encounter.name}</h5>
              <h5><MDBIcon icon="ravelry" size="lg" className="pr-3" /><strong className="character-stats">Status:</strong> {encounter.status}</h5>
            </div>
            {encounter.status !== 'Active' &&
              <div className="text-center mb-3">
              <MDBBtn
                type="button"
                rounded
                color="black"
                className="btn-block z-depth-1a black character-stats"
                onClick={this.handleSetActive}
              >
              <MDBIcon icon="star" size="lg" />
              &nbsp;&nbsp;Set Active
                </MDBBtn>
            </div>
            }
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    )
  }
}

export default connect()(MyEncounters)
