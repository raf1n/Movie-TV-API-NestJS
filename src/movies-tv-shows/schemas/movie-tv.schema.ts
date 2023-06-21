import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Actor } from "./actor.schema";
import { CrewMember } from "./crew-member.schema";
import { Producer } from "./producer.schema";
import mongoose from "mongoose";

export type MovieTVDocument = MovieTV & Document;

@Schema()
export class MovieTV extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  runtime: number;

  @Prop({ required: true })
  synopsis: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Producer" }] })
  producers: Producer[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Actor" }] })
  actors: Actor[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "CrewMember" }] })
  crewMembers: CrewMember[];
}

export const MovieTVSchema = SchemaFactory.createForClass(MovieTV);
