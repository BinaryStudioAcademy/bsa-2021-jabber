import { io, Socket as TSocket } from 'socket.io-client';
import { SocketEvent } from 'common/enums/enums';
import { Comment } from 'common/types/types';
import { Dispatch, ActionCreatorWithPayload } from '@reduxjs/toolkit';

type Constructor = {
  socketServer: string;
};

class Socket {
  #socket: TSocket;

  constructor({ socketServer }: Constructor) {
    this.#socket = io(socketServer);
  }

  public joinRoom(id: string): void {
    this.#socket.emit(SocketEvent.JOIN_ROOM, id);
  }

  public leaveRoom(id: string): void {
    this.#socket.emit(SocketEvent.LEAVE_ROOM, id);
  }

  public updateComments(comment: Comment): void {
    this.#socket.emit(SocketEvent.UPDATE_COMMENTS, comment);
  }

  public getUpdatedComments(dispatch: Dispatch, action: ActionCreatorWithPayload<Comment>): void {
    this.#socket.on(SocketEvent.UPDATE_COMMENTS, (comment: Comment) => {
      dispatch(action(comment));
    });
  }
}

export { Socket };