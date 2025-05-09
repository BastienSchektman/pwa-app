import { ApiProperty } from '@nestjs/swagger';
import GetLocationDto from '../../../../locations/_utils/dto/response/get-location.dto';
import GetUserLightDto from '../../../../users/_utils/dto/response/get-user-light.dto';

export default class GetRumorDto {
  @ApiProperty()
    id: string;

  @ApiProperty()
    content: string;

  @ApiProperty()
    location: GetLocationDto;

  @ApiProperty()
    user: GetUserLightDto;

  @ApiProperty()
    date: Date;
}
