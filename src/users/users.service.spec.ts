import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Model } from 'mongoose';
import { User } from '../dto/user.interface';
import { UsersModule } from '../users/users.module';
import { IUser } from '../models/user.model';
import { getModelToken } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from '../auth/local.strategy';
import { JwtStrategy } from '../auth/jwt.strategy';
import { AppModule } from '../app.module';
import { AuthModule } from '../auth/auth.module';

const mockUser: (id?: string, username?: string, password?: string) => User = (
  id: 'a uuid',
  username: 'John',
  password: 'pass1234'
) => {
  return {
    id,
    username,
    password,
  };
};

describe('UsersService', () => {
  let service: UsersService;
  let model: Model<IUser>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        UsersModule,
        AuthModule,
        JwtModule.register({
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: '10d' },
        }),
      ],
      providers: [
        UsersService,
        LocalStrategy,
        JwtStrategy,
        {
          provide: getModelToken('User'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockUser()),
            constructor: jest.fn().mockResolvedValue(mockUser()),
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

    service = module.get<UsersService>(UsersService);
    model = module.get<Model<IUser>>(getModelToken('User'));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get one user', async () => {
    jest.spyOn(model, 'findOne').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(mockUser()),
    } as any);
    const findMockUser = mockUser();
    const user = await service.findOne('John');
    expect(user).toEqual(findMockUser);
  });

  it('should create a user', async () => {
    jest.spyOn(model, 'create').mockReturnValue({
      exec: jest
        .fn()
        .mockResolvedValueOnce({ username: 'Max', password: 'fly' }),
    } as any);
    const user = await service.create({ username: 'Max', password: 'fly' });
    expect(user).toBe(true);
  });
});
