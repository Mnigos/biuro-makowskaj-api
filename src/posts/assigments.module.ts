import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AssigmentsController } from './assigments.controller';
import { AssigmentsService } from './assigments.service';
import { AssigmentSchema } from '../models/assigment.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Assigment', schema: AssigmentSchema }]),
  ],
  controllers: [AssigmentsController],
  providers: [AssigmentsService],
})
export class AssigmentsModule {}
