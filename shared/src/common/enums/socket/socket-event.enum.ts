enum SocketEvent {
  CONNECTION = 'connection',
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
  DISCONNECTING = 'disconnecting',
  JOIN_ROOM = 'joinRoom',
  LEAVE_ROOM = 'leaveRoom',
  UPDATE_COMMENTS = 'updateComments',
  UPDATE_COMMENTS_AFTER_DELETE = 'updateCommentsAfterDelete',
  PEER_BROADCASTER = 'peerBroadcaster',
  PEER_WATCHER = 'peerWatcher',
  PEER_DISCONNECT = 'peerDisconnect',
  PEER_OFFER = 'peerOffer',
  PEER_ANSWER = 'peerAnswer',
  PEER_CANDIDATE = 'peerCandidate',
  PEER_CLOSE = 'peerClose',
}

export { SocketEvent };
