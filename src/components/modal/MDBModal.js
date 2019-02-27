import React from 'react'
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact'

const MyMDBModal = props => {
  console.log(props)
  return (
    <MDBContainer>
      <MDBModal isOpen={props.isOpen} toggle={props.toggle}>
        <MDBModalHeader toggle={props.toggle}>{props.labels.header}</MDBModalHeader>
        <MDBModalBody>
          {props.children}
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={props.toggle}>Close</MDBBtn>
          {
            props.canConfirm && (
              <MDBBtn color="primary" onClick={props.onConfirm}>
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