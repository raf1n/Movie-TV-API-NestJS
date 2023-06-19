import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { CreateMoviesTvShowDto } from "./dto/create-movies-tv-show.dto";
import { UpdateMoviesTvShowDto } from "./dto/update-movies-tv-show.dto";
import { MovieTV, MovieTVDocument } from "./schemas/movie-tv.schema";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class MoviesTvShowsService {
  constructor(
    @InjectModel(MovieTV.name)
    private movieTvModel: Model<MovieTVDocument>
  ) {}

  create(createMoviesTvShowDto: CreateMoviesTvShowDto) {
    return this.movieTvModel.create(createMoviesTvShowDto);
  }

  findAll() {
    return this.movieTvModel.find();
  }

  findOne(id: string) {
    return this.movieTvModel.findOne({ id });
  }

  update(id: string, updateMoviesTvShowDto: UpdateMoviesTvShowDto) {
    return this.movieTvModel.findOneAndUpdate({ id }, updateMoviesTvShowDto);
  }

  remove(id: string) {
    return this.movieTvModel.findOneAndDelete({ id });
  }
}
