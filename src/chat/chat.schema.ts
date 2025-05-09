import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User, UserDocument } from '../users/user.schema';
import { Location, LocationDocument } from '../locations/locations.schema';

export type ChatDocument = Chat & Document;

@Schema()
export class Chat {
  @Prop({ required: true })
    message: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
    user: UserDocument;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Location.name })
    location: LocationDocument;

  @Prop({ default: now() })
    createdAt: Date;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
