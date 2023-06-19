import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Producer extends Document {
  @Prop({ required: true })
  name: string;
}

export const ProducerSchema = SchemaFactory.createForClass(Producer);
