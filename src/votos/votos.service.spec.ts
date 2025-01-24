import { Test, TestingModule } from '@nestjs/testing';
import { VotosService } from './votos.service';

describe('VotosService', () => {
  let service: VotosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VotosService],
    }).compile();

    service = module.get<VotosService>(VotosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
