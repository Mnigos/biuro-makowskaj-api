import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { getModelToken } from '@nestjs/mongoose';
import { AssigmentsService } from '../src/posts/assigments.service';
import Assigment from '../src/models/assigment.model';
import { CreateAssigmentDto } from '../src/dto/create-assigment.dto';

describe('Assigments (e2e)', () => {
  let app: INestApplication;
  let data;

  const assigment: CreateAssigmentDto = {
    title: 'Some title 2',
    description: 'some description 2',
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        {
          provide: getModelToken('Assigment'),
          useValue: Assigment,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Getting all assigments', () => {
    return request(app.getHttpServer())
      .get('/posts')
      .expect(200)
      .expect(({ body }) => {
        expect(body).toBeDefined();
      });
  });

  it('Creating a new assigment', async () => {
    return request(app.getHttpServer())
      .post('/posts/create')
      .set('Content-Type', 'application/json')
      .send(assigment)
      .expect(201)
      .expect(({ body }) => {
        data = body;
        expect(body.title).toBeDefined();
        expect(body.description).toBeDefined();
      });
  });

  it('Getting one assigment by id', () => {
    return request(app.getHttpServer()).get(`/posts/${data._id}`).expect(200);
  });

  it('Getting one assigment by title', () => {
    return request(app.getHttpServer()).get(`/posts/${data.title}`).expect(200);
  });

  it('Updating an assigment', () => {
    return request(app.getHttpServer())
      .patch('/posts/update')
      .send(assigment)
      .expect(200);
  });

  it('Deleting an assigment by id', () => {
    return request(app.getHttpServer())
      .delete(`/posts/delete/${data.id}`)
      .expect(200)
      .expect({ deleted: true });
  });
});
