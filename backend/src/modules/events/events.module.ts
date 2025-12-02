import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { EventSchema } from './schemas/event.schema';
import { SeedService } from '../../database/seeds';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Event', schema: EventSchema },
    ]),
  ],
  controllers: [EventsController],
  providers: [EventsService, SeedService],
  exports: [EventsService, SeedService],
})
export class EventsModule {}
