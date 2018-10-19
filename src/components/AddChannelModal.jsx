import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';

const mapStateToProps = state => ({});

@connect(mapStateToProps, actionCreators)
@reduxForm({ form: 'addChannelForm' })
export default class AddChannelModal extends React.Component {
  submitNewChannel = (value) => {
    this.props.addChannel(value.channelName);
    this.props.reset();
  }

  render() {
    const { pristine, handleSubmit } = this.props;

    return (
      <div className="modal fade" id="addChannelModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Enter channel title</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form className="d-flex" onSubmit={handleSubmit(this.submitNewChannel)}>
                <Field className="form-control" name="channelName" component="input" autoComplete="off" />
                <button type="submit" className="btn btn-dark" disabled={pristine}>Add</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
};
