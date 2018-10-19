import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import cookies from 'js-cookie';
import * as actionCreators from '../actions';

const mapStateToProps = state => ({
  currentChannelId: state.currentChannelId,
  messageSubmitState: state.messageSubmitState,
});

@connect(mapStateToProps, actionCreators)
@reduxForm({ form: 'messageForm' })
export default class MessageForm extends React.Component {
  sendMessage = (value) => {
    this.props.sendMessage({
      ...value,
      username: cookies.get('username'),
      channelId: this.props.currentChannelId,
    });
    this.props.reset();
  }

  render() {
    const { messageSubmitState, pristine, handleSubmit } = this.props;
    const isDisabled = pristine || messageSubmitState === false;

    return (
      <form className="d-flex mb-3" onSubmit={handleSubmit(this.sendMessage)}>
        <Field className="form-control" name="text" component="input" autoComplete="off"/>
        <button type="submit" className="btn btn-dark" disabled={isDisabled}>Send</button>
      </form>
    );
  }
};
