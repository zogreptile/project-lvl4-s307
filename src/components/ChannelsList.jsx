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
    const listItemClasses = (id) => cn({
      'p-0': true,
      'd-flex': true,
      'list-group-item': true,
      'list-group-item-secondary': currentChannelId === id,
    });

    return (
      <>
        <button
          className="btn btn-dark btn-block mb-3"
          data-toggle="modal"
          data-target="#addChannelModal"
        >
          New channel
        </button>

        <ul className="list-group">
          {channels.map(({ id, name, removable }) =>
            <li key={id} className={listItemClasses(id)}>
              <button
                className="btn btn-block bg-transparent text-left"
                onClick={this.switchChannel(id)}
              >
                # {name}
              </button>
              {removable ? <button className="btn bg-transparent text-danger">×</button> : null}
            </li>
          )}
        </ul>
      </>
    );
  }

  render() {
    return (
      <aside className="col-sm-3 mb-3">
        <h3 className="mb-3">Channels</h3>
        {this.renderChannels()}
      </aside>
    )
  }
};
