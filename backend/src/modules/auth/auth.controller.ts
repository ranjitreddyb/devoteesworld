import { Controller, Post, Body, Request, UseGuards, HttpCode } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'User registration' })
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  @HttpCode(200)
  @UseGuards(AuthGuard('local'))
  @ApiOperation({ summary: 'User login' })
  async login(@Request() req) {
    console.log('✅ Login request received for user:', req.user.email);
    const result = this.authService.login(req.user);
    console.log('✅ Login response:', result);
    return result;
  }

  @Post('register-guest')
  @ApiOperation({ summary: 'Guest registration without authentication' })
  async registerGuest(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerGuest(createUserDto);
  }
}
