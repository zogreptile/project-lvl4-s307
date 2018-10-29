import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import cn from 'classnames';
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

    return sendMessage({
      text: value.text,
      username,
      channelId: currentChannelId,
    });
  }

  render() {
    const { pristine, submitting, handleSubmit } = this.props;

    const btnLoadingClass = cn({
      'btn--loading': submitting,
    });

    return (
      <form className="d-flex mb-3" onSubmit={handleSubmit(this.submit)}>
        <Field className="form-control" name="text" component="input" autoComplete="off" />
        <Button
          className={btnLoadingClass}
          variant="dark"
          type="submit"
          disabled={submitting || pristine}
        >
          Send
        </Button>
      </form>
    );
  }
}
