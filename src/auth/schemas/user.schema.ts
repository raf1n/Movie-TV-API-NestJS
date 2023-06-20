import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ enum: ["admin", "user"], default: "user" })
  role: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
