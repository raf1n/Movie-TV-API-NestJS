import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { MoviesTvShowsModule } from "./movies-tv-shows/movies-tv-shows.module";
import { MovieSchema, MovieTV } from "./schemas/movie-tv.schema";
import { Actor, ActorSchema } from "./schemas/actor.schema";
import { CrewMember, CrewMemberSchema } from "./schemas/crew-member.schema";
import { Producer, ProducerSchema } from "./schemas/producer.schema";

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URL ?? ""),
    MongooseModule.forFeature([
      { name: MovieTV.name, schema: MovieSchema },
      { name: Producer.name, schema: ProducerSchema },
      { name: Actor.name, schema: ActorSchema },
      { name: CrewMember.name, schema: CrewMemberSchema },
    ]),
    MoviesTvShowsModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
