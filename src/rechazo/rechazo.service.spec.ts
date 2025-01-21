import { Test, TestingModule } from '@nestjs/testing';
import { RechazoService } from './rechazo.service';

describe('RechazoService', () => {
  let service: RechazoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RechazoService],
    }).compile();

    service = module.get<RechazoService>(RechazoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
