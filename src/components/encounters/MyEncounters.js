import React, { Component } from 'react'
import { MDBContainer, MDBCard, MDBCardBody, MDBBtn, MDBIcon } from 'mdbreact';
import "font-awesome/css/font-awesome.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { connect } from 'react-redux'
import { deleteEncounter, changeActiveEncounter } from '../../redux/actions/encounters'
import { FaStar } from 'react-icons/fa'
import MyMDBModal from '../modal/MDBModal';
import InitiativeForm from '../initiativeTracker/InitiativeForm'
import { withRouter } from 'react-router-dom'
import { bulkDeleteInitiatives } from '../../redux/actions/initiatives'

class MyEncounters extends Component {
  constructor(props) {
    super(props)
    this.state = {
      joinEncounter: false
    }
  }

  handleDelete = () => {
    const encounterInitiatives = this.props.Initiatives.list.filter(i => {
      return i.encounter === this.props.encounter._id
    })
    if (encounterInitiatives.length > 0) {
      alert('deleting all encounter initiatives before deleting encounter')
      this.props.dispatch(bulkDeleteInitiatives(
        localStorage.getItem('DNDTOKEN'), {
          list: encounterInitiatives.map(i => i._id)
        },
        () => {
          this.props.dispatch(deleteEncounter(
            localStorage.getItem('DNDTOKEN'),
            this.props.encounter._id
          ))
        }
      ))
    }
    this.props.dispatch(
      deleteEncounter(localStorage.getItem('DNDTOKEN'),
        this.props.encounter._id
      ))
  }

  handleSetActive = () => {
    this.props.dispatch(changeActiveEncounter(localStorage.getItem('DNDTOKEN'), this.props.encounter._id, this.props.activeEncounter._id))
  }

  toggleInitiativeForm = () => {
    this.setState({
      joinEncounter: !this.state.joinEncounter
    })
  }

  handleJoinEncounter = (payload) => {
    this.setState({
      joinEncounter: false
    })
    this.props.history.push({
      pathname: '/initiativeTracker'
    })
  }

  render() {
    const { encounter, user } = this.props
    const { isDM } = user
    const InitiativeFormAttributes = {
      characters: this.props.Characters.list.filter(c => c.user === user._id),
      setEncounter: encounter,
      dispatch: this.props.dispatch,
      onSubmit: this.handleJoinEncounter
    }
    return (
      <React.Fragment>
        {this.state.joinEncounter && (
          <MyMDBModal
            toggle={this.toggleInitiativeForm}
            isOpen={this.state.joinEncounter}
            fullHeight
            centered
            position="center"
            backdrop={false}
            labels={{
              header: `Join Encounter: ${encounter.name}`,
              confirm: 'Join'
            }}>
            <InitiativeForm {...InitiativeFormAttributes} />
          </MyMDBModal>
        )}
        <MDBContainer className="">
          <MDBCard className="card-container">
            <MDBCardBody>
              <div className='card-top'>
                <strong className="card-title">
                  {encounter.name}
                </strong>
                {isDM &&
                  <div className='card-actions'>
                    <MDBIcon className="card-actions-item" onClick={() => this.props.onEdit(encounter)} icon="pencil" size="lg" />
                    <MDBIcon className="card-actions-item" onClick={this.handleDelete} icon="trash" size="lg" />
                  </div>
                }
              </div>
              <div className="text-center mb-3">
                <img className="card-pic rounded-circle z-depth-0 lg" alt='DnD Turn Tracker Logo' src={`https://assetstorev1-prd-cdn.unity3d.com/package-screenshot/3f8958b2-0d97-487e-86b8-07281543baf7_scaled.jpg`} />
              </div>
              <div className="character-specs mb-3">
                <h5><MDBIcon icon="users" size="lg" className="pr-3" /><strong className="card-item-fields-label">&nbsp;Name:</strong> {encounter.name}</h5>
                <h5><MDBIcon icon="ravelry" size="lg" className="pr-3" /><strong className="card-item-fields-label">Status:</strong> {encounter.status}</h5>
              </div>
              {isDM && encounter.status !== 'Active' &&
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
              }
              {encounter.status === 'Active' &&
                <div className="card-actions">
                  <FaStar className="card-star" />
                </div>
              }
              {encounter.status === 'Active' && !isDM && (
                <MDBBtn
                  type="button"
                  rounded
                  color="black"
                  className="btn-block z-depth-1a black card-item-fields-label"
                  onClick={this.toggleInitiativeForm}
                  style={{ marginTop: '0.5rem' }}>
                  Join Encounter
              </MDBBtn>
              )}
            </MDBCardBody>
          </MDBCard>
        </MDBContainer>
      </React.Fragment>
    )
  }
}

function mapStateToProps({ Characters, Initiatives }) {
  return {
    Characters,
    Initiatives
  }
}

export default withRouter(connect(mapStateToProps)(MyEncounters))
