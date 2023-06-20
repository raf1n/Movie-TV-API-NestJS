import { Module } from "@nestjs/common";
import { MoviesTvShowsService } from "./movies-tv-shows.service";
import { MoviesTvShowsController } from "./movies-tv-shows.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { MovieTV, MovieTVSchema } from "./schemas/movie-tv.schema";
import { AuthModule } from "../auth/auth.module";
import { Actor, ActorSchema } from "./schemas/actor.schema";
import { CrewMember, CrewMemberSchema } from "./schemas/crew-member.schema";
import { Producer, ProducerSchema } from "./schemas/producer.schema";
import { RolesGuard } from "src/auth/guards/roles.guard";

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: MovieTV.name, schema: MovieTVSchema },
      { name: Actor.name, schema: ActorSchema },
      { name: CrewMember.name, schema: CrewMemberSchema },
      { name: Producer.name, schema: ProducerSchema },
    ]),
  ],
  controllers: [MoviesTvShowsController],
  providers: [MoviesTvShowsService, RolesGuard],
})
export class MoviesTvShowsModule {}
