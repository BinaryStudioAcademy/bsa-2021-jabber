import { Express } from 'express';
import { Server } from 'socket.io';
import { createServer, Server as HttpServer } from 'http';
import { injectSocket  as injectSocketMiddleware } from '~/middlewares/middlewares';
import { SocketEvent } from '~/common/enums/enums';
import { Comment } from '~/common/types/types';

type Constructor = {
  port: string;
};

class Socket {
  #socketServer?: HttpServer;
  #io?: Server;
  #port: string;

  constructor({ port }: Constructor) {
    this.#port = port;
  }

  public create(app: Express): void {
    this.#socketServer = createServer(app);
    this.#io = new Server(this.#socketServer);
    app.use(injectSocketMiddleware(this.#io));
    this.handler(this.#io);
    this.#socketServer.listen(this.#port);
  }

  private handler(io: Server): void {
    io.on(SocketEvent.CONNECTION, (socket) => {

      socket.on(SocketEvent.JOIN_ROOM, (id: number) => {
        socket.join(String(id));
      });

      socket.on(SocketEvent.UPDATE_COMMENTS, (comment: Comment) => {
        io.to(String(comment.episodeId)).emit(SocketEvent.UPDATE_COMMENTS, comment);
      });
    });
  }
}

export { Socket };
