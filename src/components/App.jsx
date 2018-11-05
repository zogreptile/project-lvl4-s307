import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ChannelsList from './ChannelsList';
import ChannelTitle from './ChannelTitle';
import Chat from './Chat';
import MessageForm from './MessageForm';
import AddChannelModal from './AddChannelModal';
import RemoveChannelModal from './RemoveChannelModal';
import RenameChannelModal from './RenameChannelModal';
import Notification from './Notification';
import UserContext from '../context';

const App = () => (
  <UserContext.Consumer>
    {username => (
      <React.Fragment>
        <Notification />
        <Row className="mt-4">
          <ChannelsList />
          <Col sm={9}>
            <ChannelTitle />
            <MessageForm username={username} />
            <Chat username={username} />
          </Col>
        </Row>
        <AddChannelModal />
        <RemoveChannelModal />
        <RenameChannelModal />
      </React.Fragment>
    )}
  </UserContext.Consumer>
);

export default App;
