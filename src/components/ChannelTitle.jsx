import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';

const mapStateToProps = state => ({
  channels: state.channels,
  currentChannelId: state.currentChannelId,
});

@connect(mapStateToProps, actionCreators)
export default class ChannelsList extends React.Component {
  showRenameChannelModal = id => () => {
    const { toggleRenameChannelModal } = this.props;
    toggleRenameChannelModal({
      isOpen: true,
      channelId: id,
    });
  }

  render() {
    const { channels, currentChannelId } = this.props;
    const currentChannel = channels.find(c => c.id === currentChannelId);
    const channelTitle = currentChannel.removable
      ? (
        <a className="text-dark" href="#" onClick={this.showRenameChannelModal(currentChannelId)}>
          <u>{currentChannel.name}</u>
        </a>
      )
      : currentChannel.name;

    return (
      <h3 className="mb-3">{channelTitle}</h3>
    );
  }
}
