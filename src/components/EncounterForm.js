import React, { Component } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon } from 'mdbreact';
import { connect } from 'react-redux'
import { createEncounter } from '../actions/encounters'

class EncounterForm extends Component {
    state = {
        name: '',
        status: ''
    }

    handleChange = (type, value) => {
        switch (type) {
            case 'name':
                this.setState({
                    name: value
                })
                break
            case 'status':
                this.setState({
                    status: value
                })
                break
            default:
                return
        }
    }

    handleSubmit = () => {
        const payload = {
            name: this.state.name,
            status: this.state.status
        }

        this.props.dispatch(createEncounter(localStorage.getItem('DNDTOKEN'), payload))
    }

    render() {
        return (
            <MDBContainer className=''>
                <MDBRow className="d-flex justify-content-center">
                    <MDBCol md="8">
                        <MDBCard className="create-character">
                            <MDBCardBody className="mx-4 d-row" >
                                <div className="text-center">
                                    <h3 className="mb-5">
                                        <strong>
                                            &nbsp;Create Encounter
                                        </strong>
                                    </h3>
                                </div>
                                <MDBIcon icon="khanda" />
                                <MDBInput
                                    label="Name"
                                    group
                                    containerClass="mb-0"
                                    required={true}
                                    getValue={(e) => this.handleChange("name", e)}
                                />
                                <MDBInput
                                    label="Status"
                                    group
                                    getValue={(e) => this.handleChange("status", e)}
                                />
                                <br />
                                <div className="text-center">
                                    <MDBBtn
                                        type="button"
                                        rounded
                                        color="black"
                                        className="btn-block z-depth-1a"
                                        onClick={() => this.handleSubmit()}
                                    >
                                        Create
                                    </MDBBtn>
                                </div>
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

export default connect(mapStateToProps)(EncounterForm)