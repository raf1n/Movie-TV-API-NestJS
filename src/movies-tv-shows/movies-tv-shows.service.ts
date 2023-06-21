import { Model } from "mongoose";
import { Injectable, NotFoundException } from "@nestjs/common";
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
    const { title, synopsis, runtime, actors, crewMembers, producers } =
      createMoviesTvShowDto;

    const actorsToAdd = await this.findOrCreateActors(actors);
    const crewMembersToAdd = await this.findOrCreateCrewMembers(crewMembers);
    const producersToAdd = await this.findOrCreateProducers(producers);

    const movie = new this.movieTvModel({
      title,
      runtime,
      synopsis,
      actors: actorsToAdd,
      crewMembers: crewMembersToAdd,
      producers: producersToAdd,
    });

    return movie.save();
  }

  private async findOrCreateActors(names: string[]): Promise<Actor[]> {
    const existingActors = await this.actorModel.find({ name: { $in: names } });
    const existingActorNames = existingActors.map((actor) => actor.name);
    const newActorNames = names.filter(
      (name) => !existingActorNames.includes(name)
    );

    const createdActors: Actor[] = [];

    for (const name of newActorNames) {
      const actor = await this.actorModel.create({ name });
      createdActors.push(actor);
    }

    return [...existingActors, ...createdActors];
  }

  private async findOrCreateCrewMembers(
    names: string[]
  ): Promise<CrewMember[]> {
    const existingCrewMembers = await this.crewMemberModel.find({
      name: { $in: names },
    });
    const existingCrewMemberNames = existingCrewMembers.map(
      (crewMember) => crewMember.name
    );
    const newCrewMemberNames = names.filter(
      (name) => !existingCrewMemberNames.includes(name)
    );

    const createdCrewMembers: CrewMember[] = [];

    for (const name of newCrewMemberNames) {
      const crewMember = await this.crewMemberModel.create({ name });
      createdCrewMembers.push(crewMember);
    }

    return [...existingCrewMembers, ...createdCrewMembers];
  }

  private async findOrCreateProducers(names: string[]): Promise<Producer[]> {
    const existingProducers = await this.producerModel.find({
      name: { $in: names },
    });
    const existingProducerNames = existingProducers.map(
      (producer) => producer.name
    );
    const newProducerNames = names.filter(
      (name) => !existingProducerNames.includes(name)
    );

    const createdProducers: Producer[] = [];

    for (const name of newProducerNames) {
      const producer = await this.producerModel.create({ name });
      createdProducers.push(producer);
    }

    return [...existingProducers, ...createdProducers];
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

  async update(id: string, updateMoviesTvShowDto: UpdateMoviesTvShowDto) {
    const { title, synopsis, runtime, actors, crewMembers, producers } =
      updateMoviesTvShowDto;

    const updatedActors = await this.findOrCreateActors(actors);
    const updatedCrewMembers = await this.findOrCreateCrewMembers(crewMembers);
    const updatedProducers = await this.findOrCreateProducers(producers);

    const updatedMovie = await this.movieTvModel.findByIdAndUpdate(
      id,
      {
        title,
        runtime,
        synopsis,
        actors: updatedActors,
        crewMembers: updatedCrewMembers,
        producers: updatedProducers,
      },
      { new: true }
    );

    return updatedMovie;
  }

  remove(id: string) {
    return this.movieTvModel.findOneAndDelete({ _id: id });
  }
}
