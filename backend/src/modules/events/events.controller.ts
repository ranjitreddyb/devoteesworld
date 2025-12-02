import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Get()
  async findAll(@Query() filters: any) {
    return this.eventsService.findAll(filters);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.eventsService.findById(id);
  }

  @Post()
  async create(@Body() createEventDto: any) {
    return this.eventsService.create(createEventDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateEventDto: any) {
    return this.eventsService.update(id, updateEventDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.eventsService.delete(id);
  }
}
