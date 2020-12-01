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

  async getAll(): Promise<Assigment> {
    const assigments = await this.AssigmentModel.find().exec();
    return assigments;
  }

  async getOneById(id): Promise<Assigment> {
    const assigment = await this.AssigmentModel.findOne({ _id: id }).exec();
    return assigment;
  }

  async getOneByTitle(title): Promise<Assigment> {
    const assigment = await this.AssigmentModel.findOne({ title }).exec();
    return assigment;
  }

  async create(assigment: Assigment): Promise<Assigment> {
    const newAssigment = await this.AssigmentModel.create(assigment as any);
    return newAssigment;
  }

  async update(assigment: Assigment): Promise<Assigment> {
    const { _id } = assigment;
    this.AssigmentModel.update({ _id }, assigment);
    const foundAssigment = await this.AssigmentModel.findOne({ _id }).exec();

    return foundAssigment;
  }

  async delete(id: string): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.AssigmentModel.remove({ id });
      return { deleted: true };
    } catch (e) {
      return { deleted: false, message: e.message };
    }
  }
}
