import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';
import * as actions from '../actions';

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
}, []);

const currentChannelId = handleActions({
  [actions.switchChannel](state, { payload }) {
    return payload;
  },
}, null);

const messageSubmitState = handleActions({
  [actions.sendMessageSuccess]() {
    return true;
  },
  [actions.sendMessageRequest]() {
    return false;
  },
}, true);

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

export default combineReducers({
  channels,
  messages,
  messageSubmitState,
  currentChannelId,
  addChannelModal,
  removeChannelModal,
  renameChannelModal,
  form: formReducer,
});
