import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import * as actionCreators from '../actions';

const mapStateToProps = state => ({
  currentChannelId: state.currentChannelId,
  messageSubmitState: state.messageSubmitState,
});

@connect(mapStateToProps, actionCreators)
@reduxForm({ form: 'messageForm' })
export default class MessageForm extends React.Component {
  submit = (value) => {
    const {
      sendMessage,
      currentChannelId,
      reset,
      username,
    } = this.props;

    sendMessage({
      text: value.text,
      username,
      channelId: currentChannelId,
    });
    reset();
  }

  render() {
    const { messageSubmitState, pristine, handleSubmit } = this.props;
    const isDisabled = pristine || messageSubmitState === false;

    return (
      <form className="d-flex mb-3" onSubmit={handleSubmit(this.submit)}>
        <Field className="form-control" name="text" component="input" autoComplete="off" />
        <Button variant="dark" type="submit" disabled={isDisabled}>Send</Button>
      </form>
    );
  }
}
