import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AssigmentsController } from './posts/assigments.controller';
import { AssigmentsService } from './posts/assigments.service';
import { AssigmentSchema } from './models/assigment.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    MongooseModule.forFeature([{ name: 'Assigment', schema: AssigmentSchema }]),
  ],
  controllers: [AssigmentsController],
  providers: [AssigmentsService],
})
export class AppModule {}
