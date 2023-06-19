import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { CreateMoviesTvShowDto } from "./dto/create-movies-tv-show.dto";
import { UpdateMoviesTvShowDto } from "./dto/update-movies-tv-show.dto";
import { MovieTV, MovieTVDocument } from "./schemas/movie-tv.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Actor } from "./schemas/actor.schema";
import { CrewMember } from "./schemas/crew-member.schema";
import { Producer } from "./schemas/producer.schema";
import mongoose from "mongoose";

@Injectable()
export class MoviesTvShowsService {
  constructor(
    @InjectModel(MovieTV.name)
    private movieTvModel: Model<MovieTVDocument>,
    @InjectModel(Actor.name)
    private readonly actorModel: Model<Actor>,
    @InjectModel(CrewMember.name)
    private readonly crewMemberModel: Model<CrewMember>,
    @InjectModel(Producer.name)
    private readonly producerModel: Model<Producer>
  ) {}

  async create(createMoviesTvShowDto: CreateMoviesTvShowDto) {
    const { title, runtime, actors, crewMembers, producers } =
      createMoviesTvShowDto;

    const createdActors = await this.createActors(actors);
    const createdCrewMembers = await this.createCrewMembers(crewMembers);
    const createdProducers = await this.createProducers(producers);

    const movie = new this.movieTvModel({
      title,
      runtime,
      actors: createdActors,
      crewMembers: createdCrewMembers,
      producers: createdProducers,
    });

    return movie.save();
  }

  private async createActors(names: string[]): Promise<Actor[]> {
    const actors = [];
    for (const name of names) {
      const actor = await this.actorModel.create({ name });
      actors.push(actor._id);
    }
    return actors;
  }

  private async createCrewMembers(names: string[]): Promise<CrewMember[]> {
    const crewMembers = [];
    for (const name of names) {
      const crewMember = await this.crewMemberModel.create({ name });
      crewMembers.push(crewMember._id);
    }
    return crewMembers;
  }

  private async createProducers(names: string[]): Promise<Producer[]> {
    const producers = [];
    for (const name of names) {
      const producer = await this.producerModel.create({ name });
      producers.push(producer._id);
    }
    return producers;
  }

  async findAll() {
    return await this.movieTvModel.aggregate([
      {
        $lookup: {
          from: "actors",
          localField: "actors",
          foreignField: "_id",
          as: "actors",
        },
      },
      {
        $lookup: {
          from: "crewmembers",
          localField: "crewMembers",
          foreignField: "_id",
          as: "crewMembers",
        },
      },
      {
        $lookup: {
          from: "producers",
          localField: "producers",
          foreignField: "_id",
          as: "producers",
        },
      },
    ]);
  }

  async findOne(id: string) {
    const show = await this.movieTvModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: "actors",
          localField: "actors",
          foreignField: "_id",
          as: "actors",
        },
      },
      {
        $lookup: {
          from: "crewmembers",
          localField: "crewMembers",
          foreignField: "_id",
          as: "crewMembers",
        },
      },
      {
        $lookup: {
          from: "producers",
          localField: "producers",
          foreignField: "_id",
          as: "producers",
        },
      },
    ]);
    return show[0];
  }

  update(id: string, updateMoviesTvShowDto: UpdateMoviesTvShowDto) {
    return this.movieTvModel.findOneAndUpdate({ id }, updateMoviesTvShowDto);
  }

  remove(id: string) {
    return this.movieTvModel.findOneAndDelete({ id });
  }
}
