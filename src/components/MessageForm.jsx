import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/index';

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
      channelId: this.props.currentChannelId,
    });
    this.props.reset();
  }

  render() {
    const { messageSubmitState, dirty } = this.props;
    const isDisabled = dirty === false || messageSubmitState === false;
    return (
      <form className="d-flex" onSubmit={this.props.handleSubmit(this.sendMessage)}>
        <Field className="form-control" name="text" component="input" />
        <button type="submit" className="btn btn-dark" disabled={isDisabled}>Send</button>
      </form>
    );
  }
};
