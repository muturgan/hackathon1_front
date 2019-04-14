import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../store/ac';
import { MDBBtn, MDBModal, MDBModalBody, MDBModalHeader} from 'mdbreact';

class Modal extends Component {

  close = () => this.props.dispatch(closeModal());

  render(){
      return (
        <MDBModal isOpen={this.props.isModalOpen} side position="top-right">
          <MDBModalHeader> {this.props.code} </MDBModalHeader>
          <MDBModalBody className="text-center">
          <span> {this.props.message} </span>
          <hr/>
          <MDBBtn color="secondary" onClick={this.close}>Close</MDBBtn>
          </MDBModalBody>
        </MDBModal>
      )
  }
}


export default connect(
  store => ({
    isModalOpen: store.error.isModalOpen,
    code: store.error.code,
    message: store.error.message,
  }),
)(Modal);