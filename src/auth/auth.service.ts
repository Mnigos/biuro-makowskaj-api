import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../dto/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    if (user && (await bcrypt.compare(password, user.password))) {
      console.log('e');
      const { _id, username } = user;
      return {
        _id,
        username,
      };
    }

    return null;
  }

  async login(user: User): Promise<any> {
    const payload = { username: user.username };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: User): Promise<any> {
    return await this.usersService.create(user);
  }
}
