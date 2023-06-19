import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): string {
    return `Welcome ${process.env.APP_NAME}`;
  }
}
