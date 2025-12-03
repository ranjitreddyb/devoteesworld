import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Req, HttpCode } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Get()
  async findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(201)
  async create(@Body() createEventDto: CreateEventDto, @Req() req: any) {
    console.log('📅 Admin creating event:', createEventDto.title);
    const event = await this.eventsService.create(createEventDto);
    console.log('✅ Event created:', event._id);
    return event;
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() updateEventDto: any, @Req() req: any) {
    console.log('✏️ Admin updating event:', id);
    return this.eventsService.update(id, updateEventDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  async delete(@Param('id') id: string, @Req() req: any) {
    console.log('🗑️ Admin deleting event:', id);
    await this.eventsService.delete(id);
    return { message: 'Event deleted' };
  }
}
