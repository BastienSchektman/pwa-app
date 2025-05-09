import { ApiProperty } from '@nestjs/swagger';

export default class GetUserLightDto {
  @ApiProperty()
    id: string;

  @ApiProperty()
    username: string;
}
