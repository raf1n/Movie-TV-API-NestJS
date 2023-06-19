import { PartialType } from '@nestjs/mapped-types';
import { CreateMoviesTvShowDto } from './create-movies-tv-show.dto';

export class UpdateMoviesTvShowDto extends PartialType(CreateMoviesTvShowDto) {}
