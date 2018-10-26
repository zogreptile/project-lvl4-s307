import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
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
};

@connect(mapStateToProps, actionCreators)
export default class Chat extends React.Component {
  render() {
    const { messages, currentChannelId, username } = this.props;
    const channelMessages = messages.filter(m => m.channelId === currentChannelId);

    return (
      <div className="d-flex flex-column-reverse bd-highlight mb-3">
        {channelMessages.map(item => (
          <Message key={item.id} isAuthor={item.username === username}>
            <small className="font-weight-bold">{item.username}</small>
            <br />
            {item.text}
          </Message>
        ))}
      </div>
    );
  }
}
