import { Test, TestingModule } from '@nestjs/testing';
import { MoviesTvShowsService } from './movies-tv-shows.service';

describe('MoviesTvShowsService', () => {
  let service: MoviesTvShowsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesTvShowsService],
    }).compile();

    service = module.get<MoviesTvShowsService>(MoviesTvShowsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
