import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export default class SendMessageDto {
  @ApiProperty()
  @IsString()
    message: string;

  @ApiProperty()
  @IsString()
    userId: string;

  @ApiProperty()
  @IsString()
    locationId: string;
}
