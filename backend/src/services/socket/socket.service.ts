import { Express } from 'express';
import { Server } from 'socket.io';
import { createServer, Server as HttpServer } from 'http';
import { socketInjector as socketInjectorMiddleware } from '~/middlewares/middlewares';

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
    app.use(socketInjectorMiddleware(this.#io));
    this.handler(this.#io);
    this.#socketServer.listen(this.#port);
  }

  public handler(io: Server): void {
    io.on('connection', (socket) => {
      socket.emit('hello', 'world');
    });
  }

}

export { Socket };
