import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AuthService } from './auth/auth.service';
import { User } from './dto/user.interface';

describe('AppController', () => {
  let controller: AppController;

  const user: User = {
    username: 'John',
    password: 'fly',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            getOneById: jest.fn().mockResolvedValue((id: string) =>
              Promise.resolve({
                _id: id,
                title: 'Some title 1',
                description: 'some description 1',
              })
            ),
            getUser: jest
              .fn()
              .mockResolvedValue((user: User) => Promise.resolve({ ...user })),
            register: jest.fn().mockImplementation(() => Promise.resolve(true)),
            login: jest
              .fn()
              .mockImplementation(() =>
                Promise.resolve({ access_token: String })
              ),
          },
        },
      ],
    }).compile();

    controller = module.get<AppController>(AppController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Should login user', async () => {
    expect(controller.login(user)).toBeDefined();
  });

  it('Should register user', async () => {
    expect(controller.register(user)).resolves.toBe(true);
  });

  it('Should not get a user', async () => {
    expect(controller.getUser(user.username)).toBeUndefined();
  });
});
