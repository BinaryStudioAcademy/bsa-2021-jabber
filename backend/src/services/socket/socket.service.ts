import { Express } from 'express';
import { Server as HttpServer } from 'http';
import { Server } from 'socket.io';
import { injectSocket as injectSocketMiddleware } from '~/middlewares/middlewares';
import { SocketEvent } from '~/common/enums/enums';
import { Comment } from '~/common/types/types';

class Socket {
  #io?: Server;

  public create(server: HttpServer, app: Express): void {
    this.#io = new Server(server);
    app.use(injectSocketMiddleware(this.#io));
    this.handler(this.#io);
  }

  private handler(io: Server): void {
    let roomId: string;
    let broadcaster: string;

    io.on(SocketEvent.CONNECTION, (socket) => {

      socket.on(SocketEvent.JOIN_ROOM, (id: number) => {
        roomId = String(id);
        socket.join(roomId);

        if (broadcaster) {
          socket.emit(SocketEvent.PEER_BROADCASTER);
        }
      });

      socket.on(SocketEvent.LEAVE_ROOM, (id: string) => {
        socket.leave(id);

        if (broadcaster) {
          io.to(broadcaster).emit(SocketEvent.PEER_DISCONNECT, socket.id);
        }
      });

      socket.on(SocketEvent.UPDATE_COMMENTS, (comment: Comment) => {
        const id = String(comment.episodeId);

        io.to(id).emit(SocketEvent.UPDATE_COMMENTS, comment);
      });

      //streaming

      socket.on(SocketEvent.PEER_BROADCASTER, () => {
        broadcaster = socket.id;
        io.to(roomId).emit(SocketEvent.PEER_BROADCASTER);
      });

      socket.on(SocketEvent.PEER_WATCHER, () => {
        socket.to(broadcaster).emit(SocketEvent.PEER_WATCHER, socket.id);
      });

      socket.on(SocketEvent.PEER_OFFER, (id: string, message: RTCSessionDescription | null) => {
        socket.to(id).emit(SocketEvent.PEER_OFFER, socket.id, message);
      });

      socket.on(SocketEvent.PEER_ANSWER, (id: string, message: RTCSessionDescription | null) => {
        socket.to(id).emit(SocketEvent.PEER_ANSWER, socket.id, message);
      });

      socket.on(SocketEvent.PEER_CANDIDATE, (id: string, message: RTCIceCandidate) => {
        socket.to(id).emit(SocketEvent.PEER_CANDIDATE, socket.id, message);
      });

      socket.on(SocketEvent.DISCONNECT, () => {
        socket.to(broadcaster).emit(SocketEvent.PEER_DISCONNECT, socket.id);
      });
    });
  }
}

export { Socket };
