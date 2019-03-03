import React from 'react'
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact'

const MyMDBModal = props => {
  const { labels, onConfirm, ...modalProps } = props
  return (
    <MDBContainer>
      <MDBModal {...modalProps}>
        <MDBModalHeader toggle={props.toggle}>{props.labels.header}</MDBModalHeader>
        <MDBModalBody className="d-flex justify-content-center">
          {props.children}
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="black" onClick={props.toggle}>Close</MDBBtn>
          {
            props.canConfirm && (
              <MDBBtn color="black" onClick={props.onConfirm}>
                {props.labels.confirm}
              </MDBBtn>
            )
          }
        </MDBModalFooter>
      </MDBModal>
    </MDBContainer>
  )
}

export default MyMDBModal