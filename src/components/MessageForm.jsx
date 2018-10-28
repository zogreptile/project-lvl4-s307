import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import * as actionCreators from '../actions';

const mapStateToProps = state => ({
  currentChannelId: state.currentChannelId,
});

@connect(mapStateToProps, actionCreators)
@reduxForm({ form: 'messageForm' })
export default class MessageForm extends React.Component {
  submit = (value) => {
    const {
      sendMessage,
      currentChannelId,
      username,
    } = this.props;

    sendMessage({
      text: value.text,
      username,
      channelId: currentChannelId,
    });
  }

  render() {
    const { pristine, handleSubmit, submitting } = this.props;

    return (
      <form className="d-flex mb-3" onSubmit={handleSubmit(this.submit)}>
        <Field className="form-control" name="text" component="input" autoComplete="off" />
        <Button variant="dark" type="submit" disabled={pristine || submitting}>Send</Button>
      </form>
    );
  }
}
