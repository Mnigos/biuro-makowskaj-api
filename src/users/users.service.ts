import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../dto/user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private readonly User: User[] = [];

  constructor(@InjectModel('User') private readonly UserModel: Model<User>) {}

  async findOne(username: string): Promise<User | undefined> {
    const user = await this.UserModel.find({ username }).exec();
    return user;
  }

  async create(userData: User): Promise<any> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    return this.UserModel.create({
      username: userData.username,
      password: hashedPassword,
    } as User);
  }
}
