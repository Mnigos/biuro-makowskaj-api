import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateAssigmentDto } from '../src/dto/create-assigment.dto';

xdescribe('Getting assigments (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET assigments', () => {
    return request(app.getHttpServer()).getAll('/posts').expect(200);
  });

  it('/POST assigments when everything is ok', () => {
    const assigment: CreateAssigmentDto = {
      title: 'title',
      description: 'description',
      image: 'image',
    };

    return request(app.getHttpServer())
      .post('/posts')
      .set('Content-Type', 'application/json')
      .send(assigment)
      .expect(201)
      .expect(assigment);
  });

  afterAll(async () => {
    await app.close();
  });
});
