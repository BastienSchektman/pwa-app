import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Location, LocationDocument } from '../locations/locations.schema';
import InitWebPushDto from '../webpush/_utils/dto/request/init-web-push.dto';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: Location.name, default: [] })
  locations: LocationDocument[];

  @Prop({ type: InitWebPushDto, default: null })
  webpush: InitWebPushDto | null;
}

export const UserSchema = SchemaFactory.createForClass(User);
