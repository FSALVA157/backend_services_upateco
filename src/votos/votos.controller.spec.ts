import { Test, TestingModule } from '@nestjs/testing';
import { VotosController } from './votos.controller';
import { VotosService } from './votos.service';

describe('VotosController', () => {
  let controller: VotosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VotosController],
      providers: [VotosService],
    }).compile();

    controller = module.get<VotosController>(VotosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
