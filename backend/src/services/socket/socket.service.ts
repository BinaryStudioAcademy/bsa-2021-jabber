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
    io.on(SocketEvent.CONNECTION, (socket) => {

      socket.on(SocketEvent.JOIN_ROOM, (id: number) => {
        socket.join(String(id));
      });

      socket.on(SocketEvent.UPDATE_COMMENTS, (comment: Comment) => {
        io.to(String(comment.episodeId)).emit(SocketEvent.UPDATE_COMMENTS, comment);
      });

      socket.on(SocketEvent.UPDATE_COMMENTS_AFTER_DELETE, (comment: Comment) =>{
        io.to(String(comment.episodeId)).emit(SocketEvent.UPDATE_COMMENTS_AFTER_DELETE, comment);
      });
    });
  }
}

export { Socket };
