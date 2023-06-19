import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { MoviesTvShowsService } from "./movies-tv-shows.service";
import { CreateMoviesTvShowDto } from "./dto/create-movies-tv-show.dto";
import { UpdateMoviesTvShowDto } from "./dto/update-movies-tv-show.dto";

@Controller("movies-tv-shows")
export class MoviesTvShowsController {
  constructor(private readonly moviesTvShowsService: MoviesTvShowsService) {}

  @Post()
  create(@Body() createMoviesTvShowDto: CreateMoviesTvShowDto) {
    return this.moviesTvShowsService.create(createMoviesTvShowDto);
  }

  @Get()
  findAll() {
    return this.moviesTvShowsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.moviesTvShowsService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateMoviesTvShowDto: UpdateMoviesTvShowDto
  ) {
    return this.moviesTvShowsService.update(id, updateMoviesTvShowDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.moviesTvShowsService.remove(id);
  }
}
