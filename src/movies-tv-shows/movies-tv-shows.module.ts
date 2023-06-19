import { Module } from "@nestjs/common";
import { MoviesTvShowsService } from "./movies-tv-shows.service";
import { MoviesTvShowsController } from "./movies-tv-shows.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { MovieTV, MovieTVSchema } from "./schemas/movie-tv.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: MovieTV.name, schema: MovieTVSchema }]),
  ],
  controllers: [MoviesTvShowsController],
  providers: [MoviesTvShowsService],
})
export class MoviesTvShowsModule {}
