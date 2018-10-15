import React from 'react';
import cn from 'classnames';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  channels: state.channels,
  messages: state.messages,
  currentChannelId: state.currentChannelId,
});

@connect(mapStateToProps)
export default class ChannelsList extends React.Component {
  getMessagesNumber = (id) => {
    const channelMessages = this.props.messages.filter(message => message.channelId === id);
    return channelMessages.length;
  };

  renderChannels = () => {
    const { channels, messages, currentChannelId } = this.props;
    const channelClasses = (id) => cn({
      'list-group-item': true,
      'list-group-item-secondary': currentChannelId === id,
    });

    return (
      <ul className="list-group">
        {channels.map(({ id, name }) =>
          <li key={id} className={channelClasses(id)}>{name}</li>)}
      </ul>
    );
  }

  render() {
    return (
      <aside className="col-sm-3">
        <h3>Channels</h3>
        {this.renderChannels()}
      </aside>
    )
  }
};
