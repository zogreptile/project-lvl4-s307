import React from 'react';
import ChannelsList from './ChannelsList';
import ChannelTitle from './ChannelTitle';
import Chat from './Chat';
import MessageForm from './MessageForm';
import AddChannelModal from './AddChannelModal';
import RemoveChannelModal from './RemoveChannelModal';
import RenameChannelModal from './RenameChannelModal';

const App = () => {
  return (
    <>
      <div className="row mt-4">
        <ChannelsList />
        <div className="col-sm-9">
          <ChannelTitle />
          <MessageForm />
          <Chat />
        </div>
      </div>
      <AddChannelModal />
      <RemoveChannelModal />
      <RenameChannelModal />
    </>
  );
};

export default App;
