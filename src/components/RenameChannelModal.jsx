import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import * as actionCreators from '../actions';

const mapStateToProps = state => ({
  renameChannelModal: state.renameChannelModal,
});

@connect(mapStateToProps, actionCreators)
@reduxForm({ form: 'renameChannelForm' })
export default class RenameChannelModal extends React.Component {
  submit = id => (value) => {
    const { renameChannel, reset } = this.props;
    renameChannel(id, value.channelNewName);
    reset();
  }

  hideModal = () => {
    const { toggleRenameChannelModal } = this.props;
    toggleRenameChannelModal({ isOpen: false });
  }

  render() {
    const { pristine, handleSubmit, renameChannelModal } = this.props;
    return (
      <Modal show={renameChannelModal.isOpen} onHide={this.hideModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Enter new title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="d-flex" onSubmit={handleSubmit(this.submit(renameChannelModal.channelId))}>
            <Field className="form-control" name="channelNewName" component="input" autoComplete="off" />
            <Button type="submit" variant="dark" disabled={pristine}>Add</Button>
          </form>
        </Modal.Body>
      </Modal>
    );
  }
}
