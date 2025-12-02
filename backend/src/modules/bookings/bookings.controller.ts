import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { BookingsService } from './bookings.service';

@ApiTags('Bookings')
@Controller('bookings')
export class BookingsController {
  constructor(private bookingsService: BookingsService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create booking' })
  async createBooking(@Body() bookingData: any) {
    return this.bookingsService.createBooking(bookingData);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get user bookings' })
  async getUserBookings(@Param('userId') userId: string) {
    return this.bookingsService.getUserBookings(userId);
  }

  @Get(':bookingId')
  @ApiOperation({ summary: 'Get booking details' })
  async getBookingDetails(@Param('bookingId') bookingId: string) {
    return this.bookingsService.getBookingDetails(bookingId);
  }

  @Get('event/:eventId')
  @ApiOperation({ summary: 'Get event bookings' })
  async getEventBookings(@Param('eventId') eventId: string) {
    return this.bookingsService.getEventBookings(eventId);
  }
}
