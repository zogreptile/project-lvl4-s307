import React from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap';
import * as actionCreators from '../actions';

const mapStateToProps = state => ({
  notification: state.notification,
});

@connect(mapStateToProps, actionCreators)
export default class Notification extends React.Component {
  handleHide = () => {
    const { hideNotification } = this.props;
    hideNotification();
  }

  render() {
    const { notification: { isVisible, type, text } } = this.props;
    return (
      <Alert
        dismissible
        show={isVisible}
        variant={type}
        className="fixed-top rounded-0"
        onClose={this.handleHide}
      >
        {text}
      </Alert>
    );
  }
}
