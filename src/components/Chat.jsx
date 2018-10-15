import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import cookies from 'js-cookie';
import * as actionCreators from '../actions/index';

const mapStateToProps = state => ({ messages: state.messages });

const Message = ({ children, isAuthor }) => {
  const sideMargin = isAuthor ? 'ml-auto' : 'mr-auto';
  const classes = cn({
    'p-2': true,
    'bd-highlight': true,
    'mb-1': true,
    border: true,
    rounded: true,
    [sideMargin]: true,
  });

  return (
    <div className={classes}>
      {children}
    </div>
  );
}

@connect(mapStateToProps, actionCreators)
export default class Chat extends React.Component {
  render() {
    const currentUser = cookies.get('username');

    return (
      <div className="d-flex flex-column bd-highlight mb-3">
        {this.props.messages.map(item =>
          <Message key={item.id} isAuthor={item.username === currentUser ? true : false}>
            <small className="font-weight-bold">{item.username}</small><br />
            {item.text}
          </Message>
        )}
      </div>
    );
  }
};
