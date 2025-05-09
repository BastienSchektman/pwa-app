import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import GetMessageDto from '../chat/_utils/dto/response/get-message.dto';
import LocationsService from './locations.service';
import CreateLocationDto from './_utils/dto/request/create-location.dto';
import Protect from '../auth/_utils/decorator/protect.decorator';
import GetLocationDto from './_utils/dto/response/get-location.dto';
import { LocationDocument } from './locations.schema';
import LocationByIdPipe from './_utils/location-by-id.pipe';
import RumorsService from '../rumors/rumors.service';
import { User } from '../users/_utils/decorator/user.decorator';
import { UserDocument } from '../users/user.schema';
import CreateRumorDto from '../rumors/_utils/dto/request/create-rumor.dto';
import GetRumorDto from '../rumors/_utils/dto/response/get-rumor.dto';
import ChatService from '../chat/chat.service';

@Controller('locations')
@ApiTags('Locations')
export default class LocationsController {
  constructor(
    private readonly locationsService: LocationsService,
    private readonly rumorsService: RumorsService,
    private readonly chatService: ChatService,
  ) {}

  @Protect()
  @Get()
  @ApiOperation({ summary: 'Récupére toutes les location.' })
  @ApiOkResponse({ description: 'SUCCESS', type: [GetLocationDto] })
  getAllLocations() {
    return this.locationsService.getAllLocation();
  }

  @Protect()
  @Post()
  @ApiOperation({ summary: 'Crée une location.' })
  @ApiCreatedResponse({ description: 'SUCCESS', type: GetLocationDto })
  createLocation(@Body() createLocationDto: CreateLocationDto) {
    return this.locationsService.createLocation(createLocationDto);
  }

  @Protect()
  @Post(':locationId/rumor')
  @ApiParam({ type: 'string', name: 'locationId' })
  @ApiCreatedResponse({ description: 'SUCCESS', type: GetRumorDto })
  createRumor(
    @User() user: UserDocument,
    @Param('locationId', LocationByIdPipe) location: LocationDocument,
    @Body() createRumorDto: CreateRumorDto,
  ) {
    return this.rumorsService.createRumor(user, createRumorDto, location);
  }

  @Protect()
  @Get(':locationId/rumor')
  @ApiParam({ type: 'string', name: 'locationId' })
  @ApiOkResponse({ description: 'SUCCESS', type: [GetRumorDto] })
  getRumorFromLocation(@Param('locationId', LocationByIdPipe) location: LocationDocument) {
    return this.rumorsService.getAllRumorInLocation(location);
  }

  @Protect()
  @Get(':locationId/messages')
  @ApiParam({ type: 'string', name: 'locationId' })
  @ApiOkResponse({ description: 'SUCCESS', type: [GetMessageDto] })
  getMessagesFromLocation(@Param('locationId', LocationByIdPipe) location: LocationDocument) {
    return this.chatService.getAllMessageInLocation(location);
  }
}
