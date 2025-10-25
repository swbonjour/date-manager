import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
} from '@nestjs/websockets';
import { ServerGateway } from './server.gateway';
import { Server, Socket } from 'socket.io';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EventsGateway extends ServerGateway {
  constructor() {
    super();
  }

  override afterInit(server: Server): void {
    super.afterInit(server);
  }

  override handleConnection(): void {
    return;
  }

  override handleDisconnect(): void {
    return;
  }

  @SubscribeMessage('message')
  handleEvent(@ConnectedSocket() client: Socket, @MessageBody() data: string) {
    client.emit('online', data);
  }

  @SubscribeMessage('global_send_message')
  globalNewMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: { id: string; message: string; type: string; create_at: Date },
  ) {
    this.server.emit('global_new_message', {
      id: data.id,
      message: data.message,
      type: data.type,
      create_at: data.create_at,
    });
  }

  @SubscribeMessage('send_message')
  newMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { id: string; message: string },
  ) {
    this.server.emit('new_message', {
      id: data.id,
      message: data.message,
    });
  }
}
