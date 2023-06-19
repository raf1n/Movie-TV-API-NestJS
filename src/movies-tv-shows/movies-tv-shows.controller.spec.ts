import { Test, TestingModule } from '@nestjs/testing';
import { MoviesTvShowsController } from './movies-tv-shows.controller';
import { MoviesTvShowsService } from './movies-tv-shows.service';

describe('MoviesTvShowsController', () => {
  let controller: MoviesTvShowsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesTvShowsController],
      providers: [MoviesTvShowsService],
    }).compile();

    controller = module.get<MoviesTvShowsController>(MoviesTvShowsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
