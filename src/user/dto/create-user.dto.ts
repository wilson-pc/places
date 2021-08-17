import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ required: true })
  @IsString()
  name: string;

  @ApiProperty({ required: true })
  @IsString()
  username: string;

  @ApiProperty({ required: true })
  @IsEmail({})
  email: string;

  @ApiProperty({ required: true })
  @MinLength(6)
  @IsString()
  password: string;
}
