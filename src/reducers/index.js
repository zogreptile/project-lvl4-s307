import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';
import * as actions from '../actions';

const notification = handleActions({
  [actions.showNotification](state, { payload: { isVisible, type, text } }) {
    return {
      ...state,
      isVisible,
      type,
      text,
    };
  },
  [actions.hideNotification](state) {
    return { ...state, isVisible: false };
  },
  [actions.sendMessageFailure](state, { payload: { text } }) {
    return { ...state, isVisible: true, text };
  },
  [actions.addChannelFailure](state, { payload: { text } }) {
    return { ...state, isVisible: true, text };
  },
  [actions.removeChannelFailure](state, { payload: { text } }) {
    return { ...state, isVisible: true, text };
  },
  [actions.renameChannelFailure](state, { payload: { text } }) {
    return { ...state, isVisible: true, text };
  },
}, { isVisible: false, type: 'danger', text: '' });

const channels = handleActions({
  [actions.addChannelSuccess](state, { payload }) {
    return [...state, payload];
  },
  [actions.removeChannelSuccess](state, { payload }) {
    const updatedChannels = state.filter(c => c.id !== payload.id);
    return updatedChannels;
  },
  [actions.renameChannelSuccess](state, { payload }) {
    const unchangedChannels = state.filter(c => c.id !== payload.id);
    return [...unchangedChannels, payload.attributes];
  },
}, []);

const messages = handleActions({
  [actions.sendMessageSuccess](state, { payload }) {
    return [...state, payload];
  },
  [actions.removeChannelSuccess](state, { payload }) {
    const updatedMessages = state.filter(m => m.channelId !== payload.id);
    return updatedMessages;
  },
}, []);

const currentChannelId = handleActions({
  [actions.switchChannel](state, { payload }) {
    return payload;
  },
  [actions.removeChannelSuccess]() {
    const defaultActiveChannel = 1;
    return defaultActiveChannel;
  },
}, null);

const addChannelModal = handleActions({
  [actions.toggleAddChannelModal](state, { payload: { isOpen } }) {
    return { isOpen };
  },
}, { isOpen: false });

const removeChannelModal = handleActions({
  [actions.toggleRemoveChannelModal](state, { payload: { isOpen, channelId } }) {
    return { ...state, isOpen, channelId };
  },
}, { isOpen: false, channelId: null });

const renameChannelModal = handleActions({
  [actions.toggleRenameChannelModal](state, { payload: { isOpen, channelId } }) {
    return { ...state, isOpen, channelId };
  },
}, { isOpen: false, channelId: null });

const form = formReducer.plugin({
  messageForm: handleActions({
    [actions.sendMessageSuccess]() {
      return null;
    },
  }, null),
});

export default combineReducers({
  notification,
  channels,
  messages,
  currentChannelId,
  addChannelModal,
  removeChannelModal,
  renameChannelModal,
  form,
});
