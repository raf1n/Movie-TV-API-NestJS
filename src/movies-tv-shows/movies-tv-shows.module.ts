import { Module } from '@nestjs/common';
import { MoviesTvShowsService } from './movies-tv-shows.service';
import { MoviesTvShowsController } from './movies-tv-shows.controller';

@Module({
  controllers: [MoviesTvShowsController],
  providers: [MoviesTvShowsService]
})
export class MoviesTvShowsModule {}
