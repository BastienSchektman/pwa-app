import { ApiProperty } from '@nestjs/swagger';
import GetLocationDto from '../../../../locations/_utils/dto/response/get-location.dto';

export default class GetUserDto {
  @ApiProperty()
    id: string;

  @ApiProperty()
    username: string;

  @ApiProperty({ type: [GetLocationDto] })
    locations: GetLocationDto[];
}
