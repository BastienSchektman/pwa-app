import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
// eslint-disable-next-line import/no-unresolved
import Protect from 'src/auth/_utils/decorator/protect.decorator';
import RumorsService from './rumors.service';
import GetRumorDto from './_utils/dto/response/get-rumor.dto';

@Controller('rumors')
@ApiTags('Rumors')
export default class RumorsController {
  constructor(private readonly rumorsService: RumorsService) {}

  @Protect()
  @Get()
  @ApiOkResponse({ description: 'SUCCESS', type: [GetRumorDto] })
  getRumors() {
    return this.rumorsService.getAllRumor();
  }
}
