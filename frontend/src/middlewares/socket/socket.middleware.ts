import { Middleware, AnyAction } from '@reduxjs/toolkit';
import { io } from 'socket.io-client';
import { ENV, SocketEvent, DataStatus } from 'common/enums/enums';
import { Comment } from 'common/types/types';
import { ActionType as EpisodeActionType } from 'store/episode/common';
import { episode as episodeAction } from 'store/actions';

type Next = (action: AnyAction) => void;

const socket = io(ENV.SOCKET_SERVER);

const socketMiddleware: Middleware = ({ dispatch }) => (next): Next => {
  socket.on(SocketEvent.UPDATE_COMMENTS, (comment: Comment): void => {
    dispatch(episodeAction.updateComments(comment));
  });

  return (action: AnyAction): void => {
    switch (action.type) {
      case `${EpisodeActionType.LOAD_COMMENTS_BY_EPISODE_ID}/${DataStatus.PENDING}`: {
        socket.emit(SocketEvent.JOIN_ROOM, action.meta.arg);
        break;
      }
      case `${EpisodeActionType.CREATE_COMMENT}/${DataStatus.FULFILLED}`: {
        socket.emit(SocketEvent.UPDATE_COMMENTS, action.payload);
        break;
      }
    }
    next(action);
  };
};

export { socketMiddleware };
