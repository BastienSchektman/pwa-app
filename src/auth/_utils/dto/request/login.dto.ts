import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export default class LoginDto {
  @ApiProperty({ example: 'GFoniX' })
  @IsString()
    username: string;

  @ApiProperty()
  @IsString()
    password: string;
}
