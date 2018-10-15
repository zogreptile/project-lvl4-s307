import React from 'react';
import ChannelsList from './ChannelsList';
import Chat from './Chat';
import MessageForm from './MessageForm';

const App = () => {
  return (
    <div className="row mt-4">
      <ChannelsList />
      <div className="col-sm-9">
        <Chat />
        <MessageForm />
      </div>
    </div>
  );
};

export default App;
