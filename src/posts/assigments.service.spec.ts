import { Test, TestingModule } from '@nestjs/testing';
import { AssigmentsService } from './assigments.service';

describe('AssigmentsService', () => {
  let service: AssigmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssigmentsService],
    }).compile();

    service = module.get<AssigmentsService>(AssigmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
