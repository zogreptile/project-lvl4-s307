import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';
import * as selectors from '../selectors';

const mapStateToProps = state => ({
  channels: selectors.channelsSelector(state),
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
        <button
          className="h3 bg-transparent border-0 m-0 p-0 text-dark"
          type="button"
          onClick={this.showRenameChannelModal(currentChannelId)}
        >
          <u>{currentChannel.name}</u>
        </button>
      )
      : currentChannel.name;

    return <h3 className="mb-3">{channelTitle}</h3>;
  }
}
