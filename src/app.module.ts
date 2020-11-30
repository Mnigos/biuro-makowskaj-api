import { Module } from '@nestjs/common';
import { AssigmentsController } from './posts/assigments.controller';
import { AssigmentsService } from './posts/assigments.service';

@Module({
  imports: [],
  controllers: [AssigmentsController],
  providers: [AssigmentsService],
})
export class AppModule {}
