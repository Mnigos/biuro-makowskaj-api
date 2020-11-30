import { Injectable } from '@nestjs/common';
import { Assigment } from 'src/dto/assigment.interface';

@Injectable()
export class AssigmentsService {
  private readonly Assigments: Assigment[] = [];

  get() {
    return this.Assigments;
  }

  create(Assigment: Assigment) {
    this.Assigments.push(Assigment);
    return Assigment;
  }
}
