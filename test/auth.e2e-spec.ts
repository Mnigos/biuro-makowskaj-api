import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { getModelToken } from '@nestjs/mongoose';
import { CreateUserDto } from '../src/dto/create-user.dto';
import User from '../src/models/user.model';

describe('Auth (e2e)', () => {
  let app: INestApplication;

  const user: CreateUserDto = {
    username: 'Max',
    password: 'sFly',
  };

  const secondUser: CreateUserDto = {
    username: 'SecondMax',
    password: 'Fly',
  };

  beforeEach(async () => {
    function mockUserModel(dto: CreateUserDto) {
      this.data = dto;
      this.save = () => {
        return this.data;
      };
    }

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        {
          provide: getModelToken('Assigment'),
          useValue: new mockUserModel(User),
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async done => {
    await app.close();
    done();
  });

  it('Trying to get user and getting Unauthorized', () => {
    return request(app.getHttpServer()).get('/user').expect(401);
  });

  it('Trying to log in and getting Unauthorized', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send(secondUser)
      .expect(401)
      .expect(({ body }) => {
        expect(body.access_token).toBeUndefined();
      });
  });

  it('Registering a user', () => {
    return request(app.getHttpServer())
      .post('/auth/register')
      .send(user)
      .expect(201)
      .expect(({ body }) => {
        expect(body).toBeDefined();
      });
  });

  it('Logging a user', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send(user)
      .expect(201)
      .expect(({ body }) => {
        expect(body.access_token).toBeDefined();
      });
  });
});
