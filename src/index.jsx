import "@babel/polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import faker from 'faker/locale/ru';
import initState from 'gon';
import cookies from 'js-cookie';
import io from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';
import App from './components/App';
import reducers from './reducers';
import * as actions from './actions';

if (!cookies.get('username')) {
  const newUsername = faker.name.findName();
  cookies.set('username', newUsername);
}

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  initState,
  composeEnhancers(
    applyMiddleware(thunk),
  )
);

const socket = io();
socket
  .on('newMessage', ({ data: { attributes } }) => {
    store.dispatch(actions.sendMessageSuccess(attributes));
  })
  .on('newChannel', ({ data: { attributes }  }) => {
    store.dispatch(actions.addChannelSuccess(attributes));
  })
  .on('removeChannel', ({ data }) => {
    store.dispatch(actions.removeChannelSuccess(data));
  })
  .on('renameChannel', ({ data }) => {
    store.dispatch(actions.renameChannelSuccess(data));
  });

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('chat'),
);
