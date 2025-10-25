import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class ServerGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  protected socketsMap: Map<string, string> = new Map();

  constructor() {}

  @WebSocketServer()
  protected server!: Server;

  afterInit(server: Server) {
    this.server = server;
  }

  handleConnection(client: Socket) {
    this.socketsMap.set(client.id, 'user');

    console.log(this.socketsMap);
  }

  handleDisconnect(client: Socket) {
    this.socketsMap.delete(client.id);

    console.log(this.socketsMap);
  }
}
