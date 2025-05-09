import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export default class CreateUserDto {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  endpoint: string;

  @ApiProperty()
  @IsString()
  publicKey: string;

  @ApiProperty()
  @IsString()
  authToken: string;
}
