const host = '/api/v1';

export default {
  channelsUrl: () => [host, 'channels'].join('/'),
  channelUrl: id => [host, 'channels', id].join('/'),
  messagesUrl: id => [host, 'channels', id, 'messages'].join('/'),
};
