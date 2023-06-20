import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { MoviesTvShowsService } from "./movies-tv-shows.service";
import { CreateMoviesTvShowDto } from "./dto/create-movies-tv-show.dto";
import { UpdateMoviesTvShowDto } from "./dto/update-movies-tv-show.dto";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { Roles } from "src/auth/decorators/roles.decorator";

@Controller("movies-tv-shows")
export class MoviesTvShowsController {
  constructor(private readonly moviesTvShowsService: MoviesTvShowsService) {}

  @Post()
  @UseGuards(AuthGuard("jwt"), RolesGuard)
  @Roles("admin")
  create(@Body() createMoviesTvShowDto: CreateMoviesTvShowDto) {
    return this.moviesTvShowsService.create(createMoviesTvShowDto);
  }

  @Get()
  @UseGuards(AuthGuard("jwt"))
  findAll() {
    return this.moviesTvShowsService.findAll();
  }

  @Get(":id")
  @UseGuards(AuthGuard("jwt"))
  findOne(@Param("id") id: string) {
    return this.moviesTvShowsService.findOne(id);
  }

  @Patch(":id")
  @UseGuards(AuthGuard("jwt"))
  @Roles("admin")
  update(
    @Param("id") id: string,
    @Body() updateMoviesTvShowDto: UpdateMoviesTvShowDto
  ) {
    return this.moviesTvShowsService.update(id, updateMoviesTvShowDto);
  }

  @Delete(":id")
  @UseGuards(AuthGuard("jwt"), RolesGuard)
  @Roles("admin")
  remove(@Param("id") id: string) {
    return this.moviesTvShowsService.remove(id);
  }
}
