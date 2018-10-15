import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';
import * as actions from '../actions';

const channels = handleActions({
  [actions.addChannel](state) {
    return { ...state };
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

}, null);

export default combineReducers({
  channels,
  messages,
  messageSubmitState,
  currentChannelId,
  form: formReducer,
});
