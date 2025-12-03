import { Controller, Post, Body, HttpCode } from '@nestjs/common';
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
  @ApiOperation({ summary: 'User login - Direct' })
  async login(@Body() loginDto: { email: string; password: string }) {
    console.log('📧 Login attempt for:', loginDto.email);
    return this.authService.loginDirect(loginDto.email, loginDto.password);
  }

  @Post('register-guest')
  @ApiOperation({ summary: 'Guest registration' })
  async registerGuest(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerGuest(createUserDto);
  }
}
