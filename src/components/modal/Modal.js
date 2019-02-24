import React from 'react'
import { MDBContainer, MDBRow, MDBBtn, MDBCol } from 'mdbreact';
import './Modal.css'

const modal = props => {
    return (
        <React.Fragment>
            <div className="backdrop"></div>
            <MDBContainer className="my-modal">
                <MDBRow className="d-flex justify-content-center">
                    <div className="my-modal__container">
                        <section>
                            {<h1>{props.title}</h1>}
                        </section>
                        <section>
                            {props.children}
                        </section>
                        <MDBRow>
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