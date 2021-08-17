import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ required: true, description: "nombre de usuario o email" })
  @IsString({})
  username: string;

  @ApiProperty({ required: true })
  @IsString()
  password: string;

}
