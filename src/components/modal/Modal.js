import React from 'react'
import { MDBContainer, MDBRow, MDBBtn, MDBCol } from 'mdbreact';
import './Modal.css'

const modal = props => {
    return (
        <React.Fragment>
            <div className="backdrop"></div>
            <MDBContainer className="my-modal text-center">
                <MDBRow className="d-flex justify-content-center">
                    <div className="my-modal__container">
                        <section>
                            {<h3>{props.title}</h3>}
                        </section>
                        <section>
                            {props.children}
                        </section>
                        <MDBRow className="my-modal__actions">
                            {props.canConfirm && (
                                <MDBCol>
                                    <MDBBtn onClick={props.onConfirm} className="btn-block btn-black z-depth-1a">Confirm</MDBBtn>
                                </MDBCol>
                            )}
                            {props.canCancel && (
                                <MDBCol>
                                    <MDBBtn onClick={props.onCancel} className="btn-block btn-black z-depth-1a">Cancel</MDBBtn>
                                </MDBCol>
                            )}
                        </MDBRow>
                    </div>
                </MDBRow>
            </MDBContainer>
        </React.Fragment>
    )
}

export default modal