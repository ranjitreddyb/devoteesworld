import { IsEmail, IsString, MinLength, Matches, IsOptional, IsIn } from 'class-validator';

export class RegisterDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @Matches(/^[0-9]{10}$/, { message: 'Phone number must be 10 digits' })
  phoneNumber: string;

  @IsString()
  @Matches(/^\+91[0-9]{10}$/, { message: 'WhatsApp number must be +91XXXXXXXXXX' })
  whatsappNumber: string;

  @IsOptional()
  @IsIn(['en', 'hi', 'ta', 'te', 'ka', 'ml', 'gu', 'mr'])
  language?: string;
}
