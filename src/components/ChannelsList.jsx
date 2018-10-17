import React from 'react';
import cn from 'classnames';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';

const mapStateToProps = state => ({
  channels: state.channels,
  currentChannelId: state.currentChannelId,
});

@connect(mapStateToProps, actionCreators)
export default class ChannelsList extends React.Component {
  switchChannel = id => () => {
    this.props.switchChannel(id);
  }

  renderChannels = () => {
    const { channels, currentChannelId } = this.props;
    const channelClasses = (id) => cn({
      'text-left': true,
      'list-group-item': true,
      'list-group-item-secondary': currentChannelId === id,
    });

    return (
      <div className="list-group">
        {channels.map(({ id, name }) =>
          <button
            key={id}
            className={channelClasses(id)}
            onClick={this.switchChannel(id)}
          >
            # {name}
          </button>)}
      </div>
    );
  }

  render() {
    return (
      <aside className="col-sm-3 mb-3">
        <h3>Channels</h3>
        {this.renderChannels()}
      </aside>
    )
  }
};
