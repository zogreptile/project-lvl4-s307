import React from 'react';

export default class ChannelsList extends React.Component {
  getMessagesNumber = (id) => {
    const channelMessages = this.props.messages.filter(message => message.channelId === id);
    return channelMessages.length;
  };

  renderChannels = () => {
    const { channels, messages } = this.props;

    return (
      <ul className="list-group">
        {channels.map(({ id, name }) =>
          <li key={id} className="list-group-item d-flex justify-content-between align-items-center">
            {name}
            <span className="badge badge-primary badge-pill">{this.getMessagesNumber(id)}</span>
          </li>)}
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
