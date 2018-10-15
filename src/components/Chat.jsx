import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/index';

const mapStateToProps = state => ({ messages: state.messages });

const Message = ({ children }) =>
  <div className="p-2 bd-highlight mb-1 mr-auto border rounded">
    {children}
  </div>;

@connect(mapStateToProps, actionCreators)
export default class Chat extends React.Component {
  render() {
    return (
      <div className="d-flex flex-column bd-highlight mb-3">
        {this.props.messages.map(item => <Message key={item.id}>{item.text}</Message>)}
      </div>
    );
  }
};
