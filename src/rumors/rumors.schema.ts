import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { User, UserDocument } from '../users/user.schema';
import { Location, LocationDocument } from '../locations/locations.schema';

export type RumorDocument = Rumor & Document;

@Schema({ timestamps: true })
export class Rumor {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
    user: UserDocument;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Location.name })
    location: LocationDocument;

  @Prop({ required: true })
    content: string;

  createdAt: Date;
}

export const RumorSchema = SchemaFactory.createForClass(Rumor);
