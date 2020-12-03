import { Test, TestingModule } from '@nestjs/testing';
import { AssigmentsController } from './assigments.controller';
import { AssigmentsService } from './assigments.service';
import { CreateAssigmentDto } from '../dto/create-assigment.dto';

describe('AssigmentsController', () => {
  let controller: AssigmentsController;
  let service: AssigmentsService;

  const assigment = {
    title: 'Some title ',
    description: 'some description ',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssigmentsController],
      providers: [
        {
          provide: AssigmentsService,
          useValue: {
            getAll: jest.fn().mockResolvedValue([
              { title: 'Some title 1', description: 'some description 1' },
              { title: 'Some title 2', description: 'some description 2' },
              {
                title: 'Some title 3',
                description: 'some description 3',
                image: 'Some image',
              },
            ]),
            getOneById: jest.fn().mockResolvedValue((id: string) =>
              Promise.resolve({
                _id: id,
                title: 'Some title 1',
                description: 'some description 1',
              })
            ),
            getOneByTitle: jest.fn().mockResolvedValue((title: string) =>
              Promise.resolve({
                title: title,
                description: 'some description 1',
              })
            ),
            create: jest
              .fn()
              .mockImplementation((assigment: CreateAssigmentDto) =>
                Promise.resolve({ ...assigment })
              ),
            update: jest
              .fn()
              .mockImplementation((assigment: CreateAssigmentDto) =>
                Promise.resolve({ _id: 'a uuid', ...assigment })
              ),
            delete: jest.fn().mockResolvedValue({ deleted: true }),
          },
        },
      ],
    }).compile();

    controller = module.get<AssigmentsController>(AssigmentsController);
    service = module.get<AssigmentsService>(AssigmentsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAssigments', () => {
    it('Should get an array of assigments', async () => {
      expect(controller.index()).resolves.toEqual([
        { title: 'Some title 1', description: 'some description 1' },
        { title: 'Some title 2', description: 'some description 2' },
        {
          title: 'Some title 3',
          description: 'some description 3',
          image: 'Some image',
        },
      ]);
    });

    it('Should get one assigment', async () => {
      expect(controller.getOneById('1234')).resolves.toEqual({
        _id: '1234',
        title: 'Some title 1',
        description: 'some description 1',
      });
    });

    it('Should get one assigment', async () => {
      expect(controller.getOneByTitle('Some Title 1')).resolves.toEqual({
        title: 'Some title 1',
        description: 'some description 1',
      });
    });
  });
  describe('PostAssigment', () => {
    it('Should post an new assigment', () => {
      const newAssigment: CreateAssigmentDto = {
        title: 'Some title',
        description: 'some description',
      };

      expect(controller.create(newAssigment)).resolves.toEqual({
        _id: expect.any(String),
        ...assigment,
      });
    });

    it('Should update an existing assigment', () => {
      const newAssigment: CreateAssigmentDto = {
        title: 'Some title',
        description: 'some description',
      };

      expect(controller.update(newAssigment)).resolves.toEqual({
        _id: expect.any(String),
        ...assigment,
      });
    });

    it('Should return that is deleted a assigment', () => {
      expect(controller.delete('a uuid that exists')).resolves.toEqual({
        deleted: true,
      });
    });

    it("Should return that didn't delete a assigment", () => {
      const deleteSpy = jest
        .spyOn(service, 'delete')
        .mockResolvedValueOnce({ deleted: false });
      expect(controller.delete('a uuid that does not exist')).resolves.toEqual({
        deleted: false,
      });
      expect(deleteSpy).toBeCalledWith('a uuid that does not exist');
    });
  });
});
