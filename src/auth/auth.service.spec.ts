import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { Model } from 'mongoose';
import { User } from '../dto/user.interface';
import { UsersModule } from '../users/users.module';
import { IUser } from '../models/user.model';
import { getModelToken } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { AppModule } from '../app.module';
import { AuthModule } from './auth.module';

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

describe('AuthService', () => {
  let service: AuthService;
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
        AuthService,
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
            exec: jest.fn().mockResolvedValue(mockUser()),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    model = module.get<Model<IUser>>(getModelToken('User'));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should login user', async () => {
    jest.spyOn(model, 'findOne').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(mockUser()),
    } as any);
    const user = await service.login(mockUser());
    expect(user.access_token).toBeDefined();
  });

  it('should not validate user', async () => {
    jest.spyOn(model, 'findOne').mockReturnValue({
      exec: jest
        .fn()
        .mockResolvedValueOnce({ username: 'John', password: 'fly' }),
    } as any);
    const user = await service.validateUser('Max', 'fly');
    expect(user).toBe(null);
  });

  it('should register user', async () => {
    jest.spyOn(model, 'create').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(mockUser()),
    } as any);
    const user = await service.register({ username: 'Max', password: 'fly' });
    expect(user).toBe(true);
  });
});
