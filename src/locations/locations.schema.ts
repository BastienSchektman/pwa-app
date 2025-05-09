import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LocationDocument = Location & Document;

@Schema()
export class Location {
  @Prop({ required: true, unique: true })
    location: string;
}

export const LocationSchema = SchemaFactory.createForClass(Location);
