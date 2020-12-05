import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { createMock } from '@golevelup/nestjs-testing';
import { DocumentQuery, Model } from 'mongoose';
import { AssigmentsService } from './assigments.service';
import { Assigment } from '../dto/assigment.interface';
import { IAssigment } from '../models/assigment.model';

const mockAssigment: (
  id?: string,
  title?: string,
  description?: string,
  image?: string
) => Assigment = (
  id: 'a uuid',
  title = 'Some title',
  description = 'some description',
  image = 'some image'
) => {
  return {
    id,
    title,
    description,
    image,
  };
};

const assigmentsArray: Assigment[] = [
  mockAssigment(),
  mockAssigment('a uuid', 'Some title 1', 'some description 1'),
  mockAssigment('a uuid', 'Some title 2', 'some description 2', 'some image 1'),
];

describe('AssigmentsService', () => {
  let service: AssigmentsService;

  let model: Model<Assigment>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssigmentsService,
        {
          provide: getModelToken('Assigment'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockAssigment()),
            constructor: jest.fn().mockResolvedValue(mockAssigment()),
            find: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            create: jest.fn(),
            delete: jest.fn(),
            remove: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AssigmentsService>(AssigmentsService);
    model = module.get<Model<Assigment>>(getModelToken('Assigment'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(done => {
    done();
  });

  it('should return all assigments', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(assigmentsArray),
    } as any);
    const assigments = await service.getAll();
    expect(assigments).toEqual(assigmentsArray);
  });
  it('should getOne by id', async () => {
    jest.spyOn(model, 'findOne').mockReturnValueOnce(
      createMock<DocumentQuery<IAssigment, IAssigment, unknown>>({
        exec: jest
          .fn()
          .mockResolvedValueOnce(mockAssigment('a id', 'Some title')),
      })
    );
    const foundAssigment = await service.getOneById('an id');
    expect(foundAssigment).toEqual({
      id: 'a id',
      title: 'Some title',
      description: 'some description',
      image: 'some image',
    });
  });
  it('should getOne by name', async () => {
    jest.spyOn(model, 'findOne').mockReturnValueOnce(
      createMock<DocumentQuery<IAssigment, IAssigment, unknown>>({
        exec: jest
          .fn()
          .mockResolvedValueOnce(mockAssigment('a id', 'Some title')),
      })
    );
    const foundAssigment = await service.getOneByTitle('Some title');
    expect(foundAssigment).toEqual({
      id: 'a id',
      title: 'Some title',
      description: 'some description',
      image: 'some image',
    });
  });
  it('should insert a new assigment', async () => {
    jest.spyOn(model, 'create').mockResolvedValueOnce({
      id: 'a id',
      title: 'Some title',
      description: 'some description',
      image: 'some image',
    } as any);
    const newassigment = await service.create({
      _id: 'a id',
      title: 'Some title',
      description: 'some description',
      image: 'some image',
    });
    expect(newassigment).toEqual(
      mockAssigment('a id', 'Some title', 'some description')
    );
  });
  it('should update a assigment successfully', async () => {
    jest.spyOn(model, 'update').mockResolvedValueOnce(true);
    jest.spyOn(model, 'findOne').mockReturnValueOnce(
      createMock<DocumentQuery<IAssigment, IAssigment, unknown>>({
        exec: jest.fn().mockResolvedValueOnce({
          id: 'a id',
          title: 'Some title',
          description: 'some description',
          image: 'some image',
        }),
      })
    );
    const updatedAssigment = await service.update({
      _id: 'a id',
      title: 'Some title',
      description: 'some description',
      image: 'some image',
    });
    expect(updatedAssigment).toEqual(
      mockAssigment('a id', 'Some title', 'some description', 'some image')
    );
  });
  it('should delete a assigment successfully', async () => {
    jest.spyOn(model, 'remove').mockResolvedValueOnce(true as any);
    expect(await service.delete('a bad id')).toEqual({ deleted: true });
  });
  it('should not delete a assigment', async () => {
    jest.spyOn(model, 'remove').mockRejectedValueOnce(new Error('Bad delete'));
    expect(await service.delete('a bad id')).toEqual({
      deleted: false,
      message: 'Bad delete',
    });
  });
});
