import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../dto/user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly UserModel: Model<User>) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.UserModel.findOne({ username }).exec();
  }

  async create(userData: User): Promise<any> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    this.UserModel.create({
      username: userData.username,
      password: hashedPassword,
    } as User);

    return true;
  }
}
