import { Test, TestingModule } from '@nestjs/testing';

import { UsuarioService } from '../usuario.service';
import { UsuarioModule } from '../usuario.module';
import { UsuarioController } from '../usuario.controller';

describe('UsuarioController', () => {
  let controller: UsuarioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuarioController],
      providers: [UsuarioService],
      imports: [UsuarioModule],
    }).compile();

    controller = module.get<UsuarioController>(UsuarioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
