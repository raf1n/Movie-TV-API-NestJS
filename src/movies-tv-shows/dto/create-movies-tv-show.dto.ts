import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsArray,
  IsPositive,
} from "class-validator";

export class CreateMoviesTvShowDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  runtime: number;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  actors: string[];

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  crewMembers: string[];

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  producers: string[];
}
