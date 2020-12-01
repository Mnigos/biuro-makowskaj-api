import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Assigment } from 'src/dto/assigment.interface';

@Injectable()
export class AssigmentsService {
  private readonly Assigments: Assigment[] = [];

  constructor(
    @InjectModel('Assigment') private readonly AssigmentModel: Model<Assigment>
  ) {}

  async get() {
    const assigments = await this.AssigmentModel.find().exec();
    return assigments;
  }

  async create(Assigment: Assigment) {
    const newAssigment = new this.AssigmentModel(Assigment);
    this.Assigments.push(Assigment);
    await newAssigment
      .save()
      .then(() => true)
      .catch(() => 'Cannot save do database');
  }
}
