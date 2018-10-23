import axios from 'axios';
import { createAction } from 'redux-actions';
import routes from '../routes';

export const sendMessageRequest = createAction('MESSAGE_SEND_REQUEST');
export const sendMessageSuccess = createAction('MESSAGE_SEND_SUCCESS');
export const sendMessageFailure = createAction('MESSAGE_SEND_FAILURE');

export const sendMessage = message => async (dispatch) => {
  dispatch(sendMessageRequest());
  try {
    await axios.post(routes.messagesUrl(message.channelId), {
      data: {
        attributes: {
          text: message.text,
          username: message.username,
        },
      },
    });
  } catch (err) {
    dispatch(sendMessageFailure(err));
  }
};

export const switchChannel = createAction('CHANNEL_SWITCH');

export const toggleAddChannelModal = createAction('ADD_CHANNEL_MODAL_TOGGLE');

export const addChannelRequest = createAction('CHANNEL_ADD_REQUEST');
export const addChannelSuccess = createAction('CHANNEL_ADD_SUCCESS');
export const addChannelFailure = createAction('CHANNEL_ADD_FAILURE');
export const addChannel = channelName => async (dispatch) => {
  dispatch(addChannelRequest());
  try {
    await axios.post(routes.channelsUrl(), {
      data: {
        attributes: {
          name: channelName,
        },
      },
    });
    dispatch(toggleAddChannelModal({ isOpen: false }));
  } catch (err) {
    dispatch(addChannelFailure(err));
    dispatch(toggleAddChannelModal({ isOpen: false }));
  }
};

export const toggleRemoveChannelModal = createAction('REMOVE_CHANNEL_MODAL_TOGGLE');

export const removeChannelRequest = createAction('CHANNEL_REMOVE_REQUEST');
export const removeChannelSuccess = createAction('CHANNEL_REMOVE_SUCCESS');
export const removeChannelFailure = createAction('CHANNEL_REMOVE_FAILURE');
export const removeChannel = id => async (dispatch) => {
  dispatch(removeChannelRequest());
  try {
    await axios.delete(routes.channelUrl(id));
    dispatch(toggleRemoveChannelModal({ isOpen: false }));
  } catch (err) {
    dispatch(removeChannelFailure(err));
    dispatch(toggleRemoveChannelModal({ isOpen: false }));
  }
};

export const toggleRenameChannelModal = createAction('RENAME_CHANNEL_MODAL_TOGGLE');

export const renameChannelRequest = createAction('CHANNEL_RENAME_REQUEST');
export const renameChannelSuccess = createAction('CHANNEL_RENAME_SUCCESS');
export const renameChannelFailure = createAction('CHANNEL_RENAME_FAILURE');
export const renameChannel = (id, channelName) => async (dispatch) => {
  dispatch(renameChannelRequest());
  try {
    await axios.patch(routes.channelUrl(id), {
      data: {
        attributes: {
          name: channelName,
        },
      },
    });
    dispatch(toggleRenameChannelModal({ isOpen: false }));
  } catch (err) {
    dispatch(renameChannelFailure(err));
    dispatch(toggleRenameChannelModal({ isOpen: false }));
  }
};
