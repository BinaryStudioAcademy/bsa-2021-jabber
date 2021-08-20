enum SocketEvent {
  CONNECTION = 'connection',
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
  JOIN_ROOM = 'joinRoom',
  LEAVE_ROOM = 'leaveRoom',
  UPDATE_COMMENTS = 'updateComments',
  PEER_BROADCASTER = 'peerBroadcaster',
  PEER_WATCHER = 'peerWatcher',
  PEER_DISCONNECT = 'peerDisconnect',
  PEER_OFFER = 'peerOffer',
  PEER_ANSWER = 'peerAnswer',
  PEER_CANDIDATE = 'peerCandidate',
}

export { SocketEvent };
