import { IsEmail, IsString, IsDate, IsOptional, IsArray, IsPhoneNumber, IsEnum, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class HealthStatusDto {
  diabetic: boolean;
  bp: boolean;
  heartAilment: boolean;
  recentSurgery: boolean;
}

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  name: string;

  @IsDate()
  @Type(() => Date)
  dateOfBirth: Date;

  @IsString()
  address: string;

  @IsPhoneNumber('IN')
  phoneNumber: string;

  @IsEnum(['single', 'married', 'divorced', 'widowed'])
  maritalStatus: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dateOfMarriage?: Date;

  @ValidateNested()
  @Type(() => HealthStatusDto)
  healthStatus: HealthStatusDto;

  @IsOptional()
  @IsString()
  aadharCardUrl?: string;

  @IsOptional()
  @IsString()
  photoUrl?: string;
}