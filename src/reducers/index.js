import { handleActions } from 'redux-actions';
import * as actions from '../actions';

export default handleActions({
  [actions.addChannel](state) {
    return { ...state };
  },
}, []);
