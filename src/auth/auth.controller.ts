import { Controller, Body, Post, Get, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { Response } from "express";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/register")
  register(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) response: Response
  ): Promise<{ token: string; message: string }> {
    return this.authService.register(registerDto, response);
  }

  @Post("/login")
  login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response
  ): Promise<{ token: string }> {
    return this.authService.login(loginDto, response);
  }
}
