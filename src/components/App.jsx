import React from 'react';
import ChannelsList from './ChannelsList';
import Chat from './Chat';
import MessageForm from './MessageForm';
import AddChannelModal from './AddChannelModal';

const App = () => {
  return (
    <>
      <div className="row mt-4">
        <ChannelsList />
        <div className="col-sm-9">
          <MessageForm />
          <Chat />
        </div>
      </div>
      <AddChannelModal />
    </>
  );
};

export default App;
