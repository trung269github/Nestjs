import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards
  } from '@nestjs/common';
  import { JwtAuthGuard } from './guards/jwt.guard';
  import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/CreateUser.dto';
  
  @Controller('auth')
  export class AuthController {
    constructor(private authService: AuthService) {}
  
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() createUserDto: CreateUserDto) {
      return this.authService.signIn(createUserDto.username, createUserDto.password);
    }
  
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
      return req.user;
    }
  }
