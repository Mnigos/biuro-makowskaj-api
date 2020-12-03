import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AssigmentsController } from './posts/assigments.controller';
import { AssigmentsService } from './posts/assigments.service';
import { AssigmentSchema } from './models/assigment.model';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './auth/local.strategy';
import { AppController } from './app.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '10d' },
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    MongooseModule.forFeature([{ name: 'Assigment', schema: AssigmentSchema }]),
  ],
  controllers: [
    AssigmentsController,
    UsersController,
    PassportModule,
    AppController,
  ],
  providers: [
    AssigmentsService,
    AuthService,
    UsersService,
    LocalStrategy,
    JwtStrategy,
  ],
})
export class AppModule {}
