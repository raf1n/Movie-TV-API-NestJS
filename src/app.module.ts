import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { MoviesTvShowsModule } from "./movies-tv-shows/movies-tv-shows.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URL ?? ""),
    MoviesTvShowsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
