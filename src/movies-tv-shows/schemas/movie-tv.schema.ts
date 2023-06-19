import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Actor } from "./actor.schema";
import { CrewMember } from "./crew-member.schema";
import { Producer } from "./producer.schema";

export type MovieTVDocument = MovieTV & Document;

@Schema()
export class MovieTV extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  runtime: number;

  @Prop({ type: [{ type: String, ref: "Producer" }] })
  producers: Producer[];

  @Prop({ type: [{ type: String, ref: "Actor" }] })
  actors: Actor[];

  @Prop({ type: [{ type: String, ref: "CrewMember" }] })
  crewMembers: CrewMember[];
}

export const MovieTVSchema = SchemaFactory.createForClass(MovieTV);
