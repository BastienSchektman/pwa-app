import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// eslint-disable-next-line import/no-unresolved
import ChatModule from 'src/chat/chat.module';
import LocationsService from './locations.service';
import LocationsController from './locations.controller';
import LocationsRepository from './locations.repository';
import { Location, LocationSchema } from './locations.schema';
import RumorsModule from '../rumors/rumors.module';
import { LocationExistRule } from './_utils/location-exist.rule';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Location.name, schema: LocationSchema }]),
    forwardRef(() => RumorsModule),
    forwardRef(() => ChatModule),
  ],
  controllers: [LocationsController],
  providers: [LocationsService, LocationsRepository, LocationExistRule],
  exports: [LocationsService, LocationsRepository],
})
export default class LocationsModule {}
