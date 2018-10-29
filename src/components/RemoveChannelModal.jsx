import React from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import cn from 'classnames';
import * as actionCreators from '../actions';

const mapStateToProps = state => ({
  removeChannelModal: state.removeChannelModal,
});

@connect(mapStateToProps, actionCreators)
@reduxForm({ form: 'removeChannelForm' })
export default class RemoveChannelModal extends React.Component {
  submit = () => {
    const { removeChannel, removeChannelModal: { channelId } } = this.props;
    return removeChannel(channelId);
  }

  hideModal = () => {
    const { toggleRemoveChannelModal } = this.props;
    toggleRemoveChannelModal({ isOpen: false });
  }

  render() {
    const { submitting, handleSubmit, removeChannelModal } = this.props;

    const btnLoadingClass = cn({
      'btn--loading': submitting,
    });

    return (
      <Modal show={removeChannelModal.isOpen} onHide={this.hideModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="d-flex" onSubmit={handleSubmit(this.submit)}>
            <Button
              className={btnLoadingClass}
              block
              type="submit"
              variant="danger"
            >
              Remove
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    );
  }
}
