import { Module } from '@nestjs/common';
import { AssigmentsController } from './assigments.controller';
import { AssigmentsService } from './assigments.service';
import { AssigmentSchema } from '../models/assigment.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    MongooseModule.forFeature([{ name: 'Assigment', schema: AssigmentSchema }]),
  ],
  controllers: [AssigmentsController],
  providers: [AssigmentsService],
})
export class AssigmentsModule {}
