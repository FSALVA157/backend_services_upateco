import { Test, TestingModule } from '@nestjs/testing';
import { RechazoController } from './rechazo.controller';
import { RechazoService } from './rechazo.service';

describe('RechazoController', () => {
  let controller: RechazoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RechazoController],
      providers: [RechazoService],
    }).compile();

    controller = module.get<RechazoController>(RechazoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
