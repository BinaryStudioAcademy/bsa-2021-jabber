import { io, Socket as TSocket } from 'socket.io-client';

type Constructor = {
  socketServer: string;
};

class Socket {
  #socket: TSocket;

  constructor({ socketServer }: Constructor) {
    this.#socket = io(socketServer);
    this.handler();
  }

  private handler(): void {
    // this.#socket.on();
  }

}

export { Socket };