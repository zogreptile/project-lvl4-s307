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
  } catch (err) {
    dispatch(addChannelFailure(err));
  }
};

export const removeChannel = createAction('CHANNEL_REMOVE');
export const switchChannel = createAction('CHANNEL_SWITCH');
