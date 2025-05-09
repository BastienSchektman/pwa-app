import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export default class InitWebPushDto {
  @ApiProperty()
  @IsString()
  endpoint: string;

  @ApiProperty()
  @IsString()
  token: string;

  @ApiProperty()
  @IsString()
  auth: string;
}
