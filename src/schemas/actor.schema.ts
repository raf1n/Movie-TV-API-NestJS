import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Actor extends Document {
  @Prop({ required: true })
  name: string;
}

export const ActorSchema = SchemaFactory.createForClass(Actor);
