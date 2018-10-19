import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';
import * as actions from '../actions';

const channels = handleActions({
  [actions.addChannelSuccess](state, { payload }) {
    return [...state, payload];
  },
}, []);

const messages = handleActions({
  [actions.sendMessageSuccess](state, { payload }) {
    return [...state, payload];
  },
}, []);

const messageSubmitState = handleActions({
  [actions.sendMessageSuccess]() {
    return true;
  },
  [actions.sendMessageRequest]() {
    return false;
  },
}, true);

const currentChannelId = handleActions({
  [actions.switchChannel](state, { payload }) {
    return payload;
  },
}, null);

export default combineReducers({
  channels,
  messages,
  messageSubmitState,
  currentChannelId,
  form: formReducer,
});
