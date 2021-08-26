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
    const broadcasters = new Map();

    io.on(SocketEvent.CONNECTION, (socket) => {

      socket.on(SocketEvent.JOIN_ROOM, (roomId: string) => {
        socket.join(roomId);

        if (broadcasters.has(roomId)) {
          socket.emit(SocketEvent.PEER_BROADCASTER, roomId);
        }
      });

      socket.on(SocketEvent.LEAVE_ROOM, (roomId: string) => {
        socket.leave(roomId);

        if (broadcasters.has(roomId)) {
          io.to(broadcasters.get(roomId)).emit(SocketEvent.PEER_DISCONNECT, socket.id);
        }
      });

      socket.on(SocketEvent.DISCONNECTING, () => {
        socket.rooms.forEach((roomId: string) => {
          if (broadcasters.has(roomId)) {
            socket.to(broadcasters.get(roomId)).emit(SocketEvent.PEER_DISCONNECT, socket.id);
          }
        });
      });

      socket.on(SocketEvent.UPDATE_COMMENTS, (comment: Comment) => {
        const id = String(comment.episodeId);

        io.to(id).emit(SocketEvent.UPDATE_COMMENTS, comment);
      });

      socket.on(SocketEvent.UPDATE_COMMENTS_AFTER_DELETE, (comment: Comment) => {
        io.to(String(comment.episodeId)).emit(SocketEvent.UPDATE_COMMENTS_AFTER_DELETE, comment);
      });

      //streaming

      socket.on(SocketEvent.PEER_BROADCASTER, (roomId: string) => {
        broadcasters.set(roomId, socket.id);
        io.to(roomId).emit(SocketEvent.PEER_BROADCASTER, roomId);
      });

      socket.on(SocketEvent.PEER_WATCHER, (roomId: string) => {
        io.to(broadcasters.get(roomId)).emit(SocketEvent.PEER_WATCHER, socket.id);
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

      socket.on(SocketEvent.PEER_CANDIDATE, (id: string, message: RTCIceCandidate) => {
        socket.to(id).emit(SocketEvent.PEER_CANDIDATE, socket.id, message);
      });

      socket.on(SocketEvent.PEER_CLOSE, (roomId: string) => {
        socket.emit(SocketEvent.PEER_CLOSE);
        broadcasters.delete(roomId);
      });
    });
  }
}

export { Socket };
