import { Middleware, AnyAction } from '@reduxjs/toolkit';
import { io } from 'socket.io-client';
import { ENV, SocketEvent, DataStatus } from 'common/enums/enums';
import { Comment } from 'common/types/types';
import { ActionType as RecordActionType } from 'store/record/common';
import { ActionType as EpisodeActionType } from 'store/episode/common';
import { episode as episodeAction } from 'store/actions';
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
    peerConnection.ontrack = (event): void => {
      const video = document.createElement('video');
      video.controls = true;
      video.autoplay = true;
      video.muted = false;
      video.srcObject = event.streams[0];

    };
    peerConnection.onicecandidate = (event): void => {
      if (event.candidate) {
        socket.emit(SocketEvent.PEER_CANDIDATE, id, event.candidate);
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

    peerConnection.onicecandidate = (event): void => {
      if (event.candidate) {
        socket.emit(SocketEvent.PEER_CANDIDATE, id, event.candidate);
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

  socket.on('connect', () => {
    socket.emit(SocketEvent.PEER_WATCHER);
  });

  socket.on(SocketEvent.PEER_BROADCASTER, () => {
    socket.emit(SocketEvent.PEER_WATCHER);
  });

  socket.on(SocketEvent.UPDATE_COMMENTS, (comment: Comment): void => {
    dispatch(episodeAction.updateComments(comment));
  });

  return async (action: AnyAction): Promise<void> => {
    switch (action.type) {
      case `${EpisodeActionType.LOAD_COMMENTS_BY_EPISODE_ID}/${DataStatus.PENDING}`: {
        socket.emit(SocketEvent.JOIN_ROOM, action.meta.arg);
        break;
      }
      case `${EpisodeActionType.CREATE_COMMENT}/${DataStatus.FULFILLED}`: {
        socket.emit(SocketEvent.UPDATE_COMMENTS, action.payload);
        break;
      }

      case EpisodeActionType.LEAVE_EPISODE: {
        socket.emit(SocketEvent.LEAVE_ROOM, action.payload);
        break;
      }

      case `${RecordActionType.START_RECORD}/${DataStatus.FULFILLED}`: {
        liveStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        socket.emit(SocketEvent.PEER_BROADCASTER);
        break;
      }
    }
    //eslint-disable-next-line
    console.log(peerConnections);

    next(action);
  };
};

export { socket };
