import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsMongoId, IsOptional } from 'class-validator';
import { LocationExists } from '../../../../locations/_utils/location-exist.rule';
import InitWebPushDto from '../../../../webpush/_utils/dto/request/init-web-push.dto';
import Validate from '../../../../_utils/decorator/validate-nested.decorator';

export default class UpdateUserDto {
  @ApiPropertyOptional()
  @IsOptional()
  username: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsMongoId({ each: true })
  @LocationExists({ each: true })
  locations: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @Validate(InitWebPushDto)
  webpush: InitWebPushDto;
}
