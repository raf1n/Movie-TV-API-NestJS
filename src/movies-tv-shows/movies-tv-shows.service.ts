import { Injectable } from '@nestjs/common';
import { CreateMoviesTvShowDto } from './dto/create-movies-tv-show.dto';
import { UpdateMoviesTvShowDto } from './dto/update-movies-tv-show.dto';

@Injectable()
export class MoviesTvShowsService {
  create(createMoviesTvShowDto: CreateMoviesTvShowDto) {
    return 'This action adds a new moviesTvShow';
  }

  findAll() {
    return `This action returns all moviesTvShows`;
  }

  findOne(id: number) {
    return `This action returns a #${id} moviesTvShow`;
  }

  update(id: number, updateMoviesTvShowDto: UpdateMoviesTvShowDto) {
    return `This action updates a #${id} moviesTvShow`;
  }

  remove(id: number) {
    return `This action removes a #${id} moviesTvShow`;
  }
}
