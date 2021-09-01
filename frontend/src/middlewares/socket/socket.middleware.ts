import { Middleware, AnyAction } from '@reduxjs/toolkit';
import { io } from 'socket.io-client';
import { ENV, SocketEvent, DataStatus } from 'common/enums/enums';
import { Comment } from 'common/types/types';
import { ActionType as RecordActionType } from 'store/record/common';
import { ActionType as EpisodeActionType } from 'store/episode/common';
import { episode as episodeAction, record as recordAction } from 'store/actions';
import { PEER_CONNECTION_CONFIG } from './common/constants/constants';
import { Next } from './common/types/types';

const peerConnections = new Map();
let liveStream: MediaStream;

const socket: Middleware = ({ dispatch }) => (next): Next => {
  const socket = io(ENV.SOCKET_SERVER);

  socket.on(SocketEvent.PEER_OFFER, (id, description) => {
    const peerConnection = new RTCPeerConnection(PEER_CONNECTION_CONFIG);
    peerConnections.set(id, peerConnection);
    peerConnection
      .setRemoteDescription(description)
      .then(() => peerConnection.createAnswer())
      .then((sdp) => peerConnection.setLocalDescription(sdp))
      .then(() => {
        socket.emit(SocketEvent.PEER_ANSWER, id, peerConnection.localDescription);
      });

    peerConnection.ontrack = (evt): void => {
      const [stream] = evt.streams;

      dispatch(recordAction.setLiveStream(stream));
    };

    peerConnection.onicecandidate = (evt): void => {
      if (evt.candidate) {
        socket.emit(SocketEvent.PEER_CANDIDATE, id, evt.candidate);
      }
    };
  });

  socket.on(SocketEvent.PEER_ANSWER, (id, description) => {
    peerConnections.get(id).setRemoteDescription(description);
  });

  socket.on(SocketEvent.PEER_WATCHER, (id) => {
    const peerConnection = new RTCPeerConnection(PEER_CONNECTION_CONFIG);
    peerConnections.set(id, peerConnection);

    liveStream.getTracks().forEach((track) => peerConnection.addTrack(track, liveStream));

    peerConnection.onicecandidate = (evt): void => {
      if (evt.candidate) {
        socket.emit(SocketEvent.PEER_CANDIDATE, id, evt.candidate);
      }
    };

    peerConnection
      .createOffer()
      .then((sdp) => peerConnection.setLocalDescription(sdp))
      .then(() => {
        socket.emit(SocketEvent.PEER_OFFER, id, peerConnection.localDescription);
      });
  });

  socket.on(SocketEvent.PEER_CANDIDATE, (id, candidate) => {
    peerConnections.get(id).addIceCandidate(new RTCIceCandidate(candidate));
  });

  socket.on(SocketEvent.PEER_DISCONNECT, (id) => {
    if (peerConnections.has(id)) {
      peerConnections.get(id).close();
      peerConnections.delete(id);
    }
  });

  socket.on(SocketEvent.PEER_BROADCASTER, (roomId: string) => {
    socket.emit(SocketEvent.PEER_WATCHER, roomId);
  });

  socket.on(SocketEvent.PEER_CLOSE, () => {
    peerConnections.forEach((connection: RTCPeerConnection) => {
      connection.close();
    });
  });

  socket.on(SocketEvent.UPDATE_COMMENTS, (comment: Comment): void => {
    dispatch(episodeAction.updateComments(comment));
    dispatch(recordAction.updateComments(comment));
  });

  socket.on(SocketEvent.UPDATE_COMMENTS_AFTER_DELETE, (comment: Comment): void => {
    dispatch(episodeAction.updateCommentsAfterDelete(comment));
    dispatch(recordAction.updateCommentsAfterDelete(comment));
  });

  socket.on(SocketEvent.UPDATE_COMMENTS_AFTER_LIKE, (comment: Comment): void => {
    dispatch(episodeAction.updateCommentsAfterLike(comment));
    dispatch(recordAction.updateCommentsAfterLike(comment));
  });

  return (action: AnyAction): void => {
    switch (action.type) {
      case `${EpisodeActionType.LOAD_COMMENTS_BY_EPISODE_ID}/${DataStatus.PENDING}`: {
        socket.emit(SocketEvent.JOIN_ROOM, String(action.meta.arg));
        break;
      }
      case `${EpisodeActionType.CREATE_COMMENT}/${DataStatus.FULFILLED}`: {
        socket.emit(SocketEvent.UPDATE_COMMENTS, action.payload);
        break;
      }
      case `${EpisodeActionType.LIKE_COMMENT}/${DataStatus.FULFILLED}`: {
        socket.emit(SocketEvent.UPDATE_COMMENTS_AFTER_LIKE, action.payload);
        break;
      }
      case `${EpisodeActionType.DELETE_COMMENT}/${DataStatus.FULFILLED}`: {
        socket.emit(SocketEvent.UPDATE_COMMENTS_AFTER_DELETE, action.payload);
        break;
      }
      case EpisodeActionType.LEAVE_EPISODE: {
        socket.emit(SocketEvent.LEAVE_ROOM, action.payload);
        break;
      }
      case `${RecordActionType.START_RECORD}/${DataStatus.FULFILLED}`: {
        const { stream, id } = action.payload;
        liveStream = stream;

        socket.emit(SocketEvent.PEER_BROADCASTER, id);
        break;
      }
      case `${RecordActionType.STOP_RECORD}/${DataStatus.FULFILLED}`: {
        socket.emit(SocketEvent.PEER_CLOSE, action.meta.arg);
        break;
      }
      case `${RecordActionType.LOAD_COMMENTS_BY_EPISODE_ID}/${DataStatus.PENDING}`: {
        socket.emit(SocketEvent.JOIN_ROOM, String(action.meta.arg));
        break;
      }
      case `${RecordActionType.CREATE_COMMENT}/${DataStatus.FULFILLED}`: {
        socket.emit(SocketEvent.UPDATE_COMMENTS, action.payload);
        break;
      }
      case `${RecordActionType.LIKE_COMMENT}/${DataStatus.FULFILLED}`: {
        socket.emit(SocketEvent.UPDATE_COMMENTS_AFTER_LIKE, action.payload);
        break;
      }
      case `${RecordActionType.DELETE_COMMENT}/${DataStatus.FULFILLED}`: {
        socket.emit(SocketEvent.UPDATE_COMMENTS_AFTER_DELETE, action.payload);
        break;
      }
      case RecordActionType.LEAVE_EPISODE: {
        socket.emit(SocketEvent.LEAVE_ROOM, action.payload);
        break;
      }
    }

    next(action);
  };
};

export { socket };
