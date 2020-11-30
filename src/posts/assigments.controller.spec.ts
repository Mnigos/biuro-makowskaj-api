import { Test, TestingModule } from '@nestjs/testing';
import { AssigmentsController } from './assigments.controller';

describe('AssigmentsController', () => {
  let controller: AssigmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssigmentsController],
    }).compile();

    controller = module.get<AssigmentsController>(AssigmentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
