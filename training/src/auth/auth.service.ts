import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/typeorm/entities/User';
import { UsersService } from 'src/users/services/users/users.service';
import { CreateUserDto } from 'src/users/dto/CreateUser.dto';

@Injectable()
export class AuthService {

    constructor(private jwtService: JwtService,
        private userService: UsersService,
    ){}

    async signIn(
      username: string,
      pass: string,
    ): Promise<{ access_token: string }> {
      const user = await this.userService.findByUsername(username);
      if (user?.password !== pass) {
        throw new UnauthorizedException();
      }
      const payload = { sub: user.id, username: user.username };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }
    async validateUser(payload: any): Promise<User> {
    return this.userService.findByUsername(payload.username);
  }
}
