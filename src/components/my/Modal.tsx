import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../store/actions';
import { storeState } from '../../store/store';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
const { MDBBtn, MDBModal, MDBModalBody, MDBModalHeader} = require('mdbreact');

type ModalProps = {
  isModalOpen: boolean;
  code: string|number|null;
  message: string|null;
  dispatch: ThunkDispatch<storeState, {}, AnyAction>;
}


class Modal extends Component<ModalProps, {}> {

  close = () => this.props.dispatch(closeModal());

  render(){
      return (
        <MDBModal isOpen={this.props.isModalOpen} side position="top-right">
          <MDBModalHeader> {this.props.code} </MDBModalHeader>
          <MDBModalBody className="text-center">
          <span> {this.props.message} </span>
          <hr/>
          <MDBBtn color="secondary" onClick={this.close}>Ясненько...</MDBBtn>
          </MDBModalBody>
        </MDBModal>
      )
  }
}

export default connect(
  (store: storeState) => ({
    isModalOpen: store.error.isModalOpen,
    code: store.error.code,
    message: store.error.message,
  }),
)(Modal);