import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import cn from 'classnames';
import * as actionCreators from '../actions';

const mapStateToProps = state => ({
  addChannelModal: state.addChannelModal,
});

@connect(mapStateToProps, actionCreators)
@reduxForm({ form: 'addChannelForm' })
export default class AddChannelModal extends React.Component {
  submit = (value) => {
    const { addChannel } = this.props;
    return addChannel(value.channelName);
  }

  hideModal = () => {
    const { toggleAddChannelModal } = this.props;
    toggleAddChannelModal({ isOpen: false });
  }

  render() {
    const {
      pristine,
      submitting,
      handleSubmit,
      addChannelModal,
    } = this.props;

    const btnLoadingClass = cn({
      'btn--loading': submitting,
    });

    return (
      <Modal show={addChannelModal.isOpen} onHide={this.hideModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Enter channel title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="d-flex" onSubmit={handleSubmit(this.submit)}>
            <Field
              className="form-control"
              name="channelName"
              component="input"
              autoComplete="off"
            />
            <Button
              className={btnLoadingClass}
              type="submit"
              variant="dark"
              disabled={submitting || pristine}
            >
              Add
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    );
  }
}
