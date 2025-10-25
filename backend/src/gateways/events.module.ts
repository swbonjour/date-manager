import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { ServerGateway } from './server.gateway';

@Module({
  providers: [EventsGateway, ServerGateway],
})
export class EventsModule {}
