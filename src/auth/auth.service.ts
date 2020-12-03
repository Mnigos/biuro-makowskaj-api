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

    if (user && bcrypt.compare(password, user.password)) {
      // Returning result without password
      const { password, ...result } = user; //eslint-disable-line @typescript-eslint/no-unused-vars
      return result;
    }

    return null;
  }

  async login(user: User): Promise<any> {
    const payload = { username: user.username };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async resister(userData: User): Promise<any> {
    return await this.usersService.create(userData);
  }
}
