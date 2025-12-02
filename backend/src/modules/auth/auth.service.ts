import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    try {
      // Check if user exists
      const existingUser = await this.usersService.findByEmail(createUserDto.email);
      if (existingUser) {
        throw new BadRequestException('User already exists');
      }

      // Hash password
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

      // Create user with role
      const user = await this.usersService.create({
        ...createUserDto,
        password: hashedPassword,
        role: 'user', // Default role
      });

      // Generate token
      const payload = {
        email: user.email,
        sub: user._id,
        role: user.role || 'user',
      };

      console.log('✅ User registered:', user.email);

      return {
        access_token: this.jwtService.sign(payload),
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          phoneNumber: user.phoneNumber,
          role: user.role,
        },
      };
    } catch (error) {
      console.error('❌ Registration error:', error);
      throw error;
    }
  }

  async login(user: any) {
    try {
      console.log('🔐 Logging in user:', user.email);
      
      const payload = {
        email: user.email,
        sub: user._id,
        role: user.role,
      };

      const result = {
        access_token: this.jwtService.sign(payload),
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          phoneNumber: user.phoneNumber,
          role: user.role,
        },
      };

      console.log('✅ Login successful, returning user:', result.user);
      return result;
    } catch (error) {
      console.error('❌ Login error:', error);
      throw error;
    }
  }

  async validateUser(email: string, password: string) {
    try {
      const user = await this.usersService.findByEmail(email);
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      console.log('✅ User validated:', email);
      return user;
    } catch (error) {
      console.error('❌ Validation error:', error);
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async registerGuest(createUserDto: CreateUserDto) {
    return this.register(createUserDto);
  }
}
