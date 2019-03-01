import React, { Component } from 'react'
import { MDBContainer, MDBCard, MDBCardBody, MDBBtn, MDBIcon } from 'mdbreact';
import "font-awesome/css/font-awesome.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { connect } from 'react-redux'
import { deleteEncounter, changeActiveEncounter } from '../../redux/actions/encounters'
import { FaStar } from 'react-icons/fa'

class MyEncounters extends Component {
  state = {
    count: 0
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
        <MDBCard className="card-container">
          <MDBCardBody>
            <div className='card-top'>
              <strong className="card-title">
                {encounter.name}
              </strong>
              <div className='card-actions'>
                <MDBIcon className="card-actions-item" onClick={() => this.props.onEdit(encounter)} icon="pencil" size="lg" />
                <MDBIcon className="card-actions-item" onClick={this.handleDelete} icon="trash" size="lg" />
              </div>
            </div>
            <div className="text-center mb-3">
              <img className="card-pic rounded-circle z-depth-0 lg" alt='DnD Turn Tracker Logo' src={`https://assetstorev1-prd-cdn.unity3d.com/package-screenshot/3f8958b2-0d97-487e-86b8-07281543baf7_scaled.jpg`} />
            </div>
            <div className="character-specs mb-3">
              <h5><MDBIcon icon="users" size="lg" className="pr-3" /><strong className="card-item-fields-label">&nbsp;Name:</strong> {encounter.name}</h5>
              <h5><MDBIcon icon="ravelry" size="lg" className="pr-3" /><strong className="card-item-fields-label">Status:</strong> {encounter.status}</h5>
            </div>
            {encounter.status !== 'Active' ? (
              <div className="text-center">
                <MDBBtn
                  type="button"
                  rounded
                  color="black"
                  className="btn-block z-depth-1a black card-item-fields-label"
                  onClick={this.handleSetActive}
                >
                  <MDBIcon icon="star" size="lg" />
                  Set Active
                </MDBBtn>
              </div>
            ) : (
                <div className="card-actions">
                  <FaStar className="card-star"/>
                </div>
              )

            }
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    )
  }
}

export default connect()(MyEncounters)
