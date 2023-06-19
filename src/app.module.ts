import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { MoviesTvShowsModule } from "./movies-tv-shows/movies-tv-shows.module";
import {
  MovieTV,
  MovieTVSchema,
} from "./movies-tv-shows/schemas/movie-tv.schema";
import { Actor, ActorSchema } from "./movies-tv-shows/schemas/actor.schema";
import {
  CrewMember,
  CrewMemberSchema,
} from "./movies-tv-shows/schemas/crew-member.schema";
import {
  Producer,
  ProducerSchema,
} from "./movies-tv-shows/schemas/producer.schema";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL ?? ""),
    MongooseModule.forFeature([
      { name: MovieTV.name, schema: MovieTVSchema },
      { name: Producer.name, schema: ProducerSchema },
      { name: Actor.name, schema: ActorSchema },
      { name: CrewMember.name, schema: CrewMemberSchema },
    ]),
    MoviesTvShowsModule,
    AuthModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
