import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class CrewMember extends Document {
  @Prop({ required: true })
  name: string;
}

export const CrewMemberSchema = SchemaFactory.createForClass(CrewMember);
