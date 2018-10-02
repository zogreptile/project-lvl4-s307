import { connect } from 'react-redux';
import Component from '../components/ChannelsList';

const mapStateToProps = state => ({
  channels: state.channels,
  messages: state.messages,
});

const ChannelsListContainer = connect(
  mapStateToProps,
)(Component);

export default ChannelsListContainer;
