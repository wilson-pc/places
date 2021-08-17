import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ required: true })
  @IsString()
  name: string;

  @ApiProperty({ required: true })
  @IsString()
  username: string;

  @ApiProperty({ required: true })
  @IsEmail({})
  email: string;
}
