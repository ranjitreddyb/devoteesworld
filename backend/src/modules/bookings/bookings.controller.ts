import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { BookingsService } from './bookings.service';

@ApiTags('Bookings')
@Controller('bookings')
export class BookingsController {
  constructor(private bookingsService: BookingsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all bookings' })
  async getAllBookings() {
    console.log('📋 Fetching all bookings');
    return this.bookingsService.getAllBookings();
  }

  @Post('create')
  @ApiOperation({ summary: 'Create booking' })
  async createBooking(@Body() bookingData: any) {
    // ⚠️ DEPRECATED: Bookings are now created automatically during payment verification
    throw new Error('❌ Direct booking creation is disabled. Bookings are created automatically when payment is verified via /payments/verify endpoint.');
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
