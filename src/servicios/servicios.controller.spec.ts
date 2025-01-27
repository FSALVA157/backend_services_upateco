import { Test, TestingModule } from '@nestjs/testing';
import { ServiciosController } from './servicios.controller';
import { ServiciosService } from './servicios.service';
import { ServiciosModule } from './servicios.module';
import { Repository } from 'typeorm';
import { Servicio } from './entities/servicio.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateServicioDto } from './dto/create-servicio.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';
import { NotFoundException } from '@nestjs/common';

// describe('ServiciosController', () => {
//   let controller: ServiciosController;
//   let servicioRepository: Repository<Servicio>;

describe('ServiciosController', () => {
  let controller: ServiciosController;
  let service: ServiciosService;
  let repository: Repository<Servicio>;

  const mockServicio = {
    id_servicio: 1,
    titulo: 'Test service',
    descripcion: 'Test description',
    usuario_id: 1,
    categoria_id: 1,
    duracion: '2 horas',
    horario: 'Lunes a Viernes 9:00-18:00',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiciosController],
      providers: [
        ServiciosService,
        {
          provide: getRepositoryToken(Servicio),
          useValue: {
            create: jest.fn().mockReturnValue(mockServicio),
            save: jest.fn().mockResolvedValue(mockServicio),
            find: jest.fn().mockResolvedValue([mockServicio]),
            findOneBy: jest.fn().mockResolvedValue(mockServicio),
            preload: jest.fn().mockResolvedValue(mockServicio),
            softRemove: jest.fn().mockResolvedValue(mockServicio),
          },
        },
      ],
    }).compile();

    controller = module.get<ServiciosController>(ServiciosController);
    service = module.get<ServiciosService>(ServiciosService);
    repository = module.get<Repository<Servicio>>(getRepositoryToken(Servicio));
  });

  // it('should be defined', () => {
  //   expect(controller).toBeDefined();
  // });

  describe('create', () => {
    it('should create a new service', async () => {
      const createDto: CreateServicioDto = {
        titulo: 'Test service',
        descripcion: 'Test description',
        usuario_id: 1,
        categoria_id: 1,
        duracion: '2 horas',
        horario: 'Lunes a Viernes 9:00-18:00',
      };

      const result = await controller.create(createDto);
      expect(result).toEqual(mockServicio);
    });
  });

  describe('findAll', () => {
    it('should return an array of services', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([mockServicio]);
    });
  });

  describe('findOne', () => {
    it('should return a single service', async () => {
      const result = await controller.findOne('1');
      expect(result).toEqual(mockServicio);
    });
  });

  // describe('findOneByTitle', () => {
  //   it('should return a service by title', async () => {
  //     jest.spyOn(service, 'findOneByTitulo').mockResolvedValue(mockServicio);
  //     const result = await controller.findOneByTitle('Test');
  //     expect(result).toEqual(mockServicio);
  //   });
  // });

  // describe('findManyByCategory', () => {
  //   it('should return services by category', async () => {
  //     jest.spyOn(service, 'findByCategoria').mockResolvedValue([mockServicio]);
  //     const result = await controller.findManyByCategory(1);
  //     expect(result).toEqual([mockServicio]);
  //   });
  // });

  // describe('findManyByUser', () => {
  //   it('should return services by user', async () => {
  //     jest.spyOn(service, 'findByUser').mockResolvedValue([mockServicio]);
  //     const result = await controller.findManyByUser(1);
  //     expect(result).toEqual([mockServicio]);
  //   });
  // });

  // describe('update', () => {
  //   it('should update a service', async () => {
  //     const updateDto: UpdateServicioDto = {
  //       titulo: 'Updated service'
  //     };

  //     jest.spyOn(service, 'update').mockResolvedValue({
  //       ...mockServicio,
  //       ...updateDto
  //     });

  //     const result = await controller.update('1', updateDto);
  //     expect(result).toEqual({
  //       ...mockServicio,
  //       titulo: 'Updated service'
  //     });
  //   });
  // });

  // describe('remove', () => {
  //   it('should remove a service', async () => {
  //     const result = await controller.remove('1');
  //     expect(result).toEqual(mockServicio);
  //   });
  // });
});
