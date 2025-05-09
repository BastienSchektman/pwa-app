import { ApiProperty } from '@nestjs/swagger';

export default class GetLocationDto {
  @ApiProperty()
    id: string;

  @ApiProperty()
    location: string;
}
