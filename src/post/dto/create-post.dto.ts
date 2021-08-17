import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { latLng } from 'src/shared/decorators/is-lat-lng';
export class CreatePostDto {
  @ApiProperty({ required: true })
  @IsString()
  description: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  location: string;

  @ApiProperty({
    required: false,
    description: 'format lat,lng',
    default: '-12.0264987,-77.267986',
  })
  @latLng({ message: 'latLng value is not valid' })
  @IsOptional()
  latLng: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsOptional()
  items: string;
}
