import { Model } from "mongoose";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./schemas/user.schema";
import { JwtService } from "@nestjs/jwt";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { Response } from "express";
import * as bcrypt from "bcryptjs";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService
  ) {}

  async register(
    registerDto: RegisterDto,
    response: Response
  ): Promise<{ token: string; message: string }> {
    const { name, email, password, role } = registerDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const userExist = await this.userModel.findOne({ email });
    if (userExist) {
      return {
        token: null,
        message: "User Already Exist, Please Login ",
      };
    }

    const user = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    const token = this.jwtService.sign({ id: user._id });

    response.cookie("token", token, { httpOnly: true });

    return { token, message: "Success" };
  }

  async login(
    loginDto: LoginDto,
    response: Response
  ): Promise<{ token: string }> {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException("Invalid email or password");
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException("Invalid email or password");
    }

    const token = this.jwtService.sign({ id: user._id });

    response.cookie("token", token, { httpOnly: true });

    return { token };
  }
}
