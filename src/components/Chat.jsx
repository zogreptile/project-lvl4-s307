import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import cookies from 'js-cookie';
import * as actionCreators from '../actions';

const mapStateToProps = state => ({
  messages: state.messages,
  currentChannelId: state.currentChannelId,
});

const Message = ({ children, isAuthor }) => {
  const classes = cn({
    'p-2': true,
    'bd-highlight': true,
    'mb-1': true,
    'ml-auto': isAuthor,
    'mr-auto': !isAuthor,
    border: true,
    rounded: true,
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
      <div className="d-flex flex-column-reverse bd-highlight mb-3">
        {this.props.messages
          .filter(m => m.channelId === this.props.currentChannelId)
          .map(item =>
            <Message key={item.id} isAuthor={item.username === currentUser}>
              <small className="font-weight-bold">{item.username}</small><br />
              {item.text}
            </Message>
        )}
      </div>
    );
  }
};
