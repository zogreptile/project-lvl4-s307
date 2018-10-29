import axios from 'axios';
import { createAction } from 'redux-actions';
import routes from '../routes';

export const showNotification = createAction('NOTIFICATION_SHOW');
export const hideNotification = createAction('NOTIFICATION_HIDE');

export const sendMessageRequest = createAction('MESSAGE_SEND_REQUEST');
export const sendMessageSuccess = createAction('MESSAGE_SEND_SUCCESS');
export const sendMessageFailure = createAction('MESSAGE_SEND_FAILURE');
export const sendMessage = message => (dispatch) => {
  dispatch(sendMessageRequest());
  return axios
    .post(routes.messagesUrl(message.channelId), {
      data: {
        attributes: {
          text: message.text,
          username: message.username,
        },
      },
    })
    .catch(() => {
      dispatch(sendMessageFailure({
        text: 'Error occured. It may be problems on server or with your Internet connection.',
      }));
    });
};

export const switchChannel = createAction('CHANNEL_SWITCH');

export const toggleAddChannelModal = createAction('CHANNEL_ADD_MODAL_TOGGLE');

export const addChannelRequest = createAction('CHANNEL_ADD_REQUEST');
export const addChannelSuccess = createAction('CHANNEL_ADD_SUCCESS');
export const addChannelFailure = createAction('CHANNEL_ADD_FAILURE');
export const addChannel = channelName => (dispatch) => {
  dispatch(addChannelRequest());
  return axios
    .post(routes.channelsUrl(), {
      data: {
        attributes: {
          name: channelName,
        },
      },
    })
    .then(() => {
      dispatch(toggleAddChannelModal({ isOpen: false }));
    })
    .catch(() => {
      dispatch(toggleAddChannelModal({ isOpen: false }));
      dispatch(addChannelFailure({
        text: 'Error occured. It may be problems on server or with your Internet connection.',
      }));
    });
};

export const toggleRemoveChannelModal = createAction('CHANNEL_REMOVE_MODAL_TOGGLE');

export const removeChannelRequest = createAction('CHANNEL_REMOVE_REQUEST');
export const removeChannelSuccess = createAction('CHANNEL_REMOVE_SUCCESS');
export const removeChannelFailure = createAction('CHANNEL_REMOVE_FAILURE');
export const removeChannel = id => (dispatch) => {
  dispatch(removeChannelRequest());
  return axios
    .delete(routes.channelUrl(id))
    .then(() => {
      dispatch(toggleRemoveChannelModal({ isOpen: false }));
    })
    .catch(() => {
      dispatch(toggleRemoveChannelModal({ isOpen: false }));
      dispatch(removeChannelFailure({
        text: 'Error occured. It may be problems on server or with your Internet connection.',
      }));
    });
};

export const toggleRenameChannelModal = createAction('CHANNEL_RENAME_MODAL_TOGGLE');

export const renameChannelRequest = createAction('CHANNEL_RENAME_REQUEST');
export const renameChannelSuccess = createAction('CHANNEL_RENAME_SUCCESS');
export const renameChannelFailure = createAction('CHANNEL_RENAME_FAILURE');
export const renameChannel = (id, channelName) => (dispatch) => {
  dispatch(renameChannelRequest());
  return axios
    .patch(routes.channelUrl(id), {
      data: {
        attributes: {
          name: channelName,
        },
      },
    })
    .then(() => {
      dispatch(toggleRenameChannelModal({ isOpen: false }));
    })
    .catch(() => {
      dispatch(toggleRenameChannelModal({ isOpen: false }));
      dispatch(renameChannelFailure({
        text: 'Error occured. It may be problems on server or with your Internet connection.',
      }));
    });
};
