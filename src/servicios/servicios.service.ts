import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateServicioDto } from './dto/create-servicio.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Servicio } from './entities/servicio.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ServiciosService {
  constructor(
    @InjectRepository(Servicio)
    private readonly servicioRepository: Repository<Servicio>, //private readonly jwtService: JwtService,
  ) {}

  async create(createServicioDto: CreateServicioDto) {
    try {
      const newServicio = this.servicioRepository.create(createServicioDto);
      await this.servicioRepository.save(newServicio);
      return newServicio;
    } catch (error) {
      console.error(error);
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException('Error al crear nuevo servicio');
      }
    }
  }

  async findAll() {
    try {
      return await this.servicioRepository.find();
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error al obtener los servicios');
    }
  }

  async findOneById(id: number) {
    try {
      const servicio = await this.servicioRepository.findOneBy({
        id_servicio: id,
      });
      if (!servicio) {
        throw new BadRequestException('Servicio no encontrado');
      }
      return servicio;
    } catch (error) {
      console.error(error);
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException('Error al buscar por id');
      }
    }
  }

  async findOneByTitulo(tituloDato: string) {
    try {
      const queryBuilder = this.servicioRepository.createQueryBuilder();
      const servicio = await queryBuilder
        .where('LOWER(titulo) LIKE :titulo', {
          titulo: `%${tituloDato.toLowerCase()}%`,
        })
        .getOne();
      if (!servicio) {
        throw new BadRequestException('Servicio no encontrado');
      }
      return servicio;
    } catch (error) {
      console.error(error);
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException(
          'Error al buscar el servicio por titulo',
        );
      }
    }
  }

  //TODO: Implementar el método para buscar por categoría
  //TODO: Implementar el método para buscar por usuario

  async update(id: number, updateServicioDto: UpdateServicioDto) {
    try {
      const usuario = await this.servicioRepository.preload({
        id_servicio: id,
        ...updateServicioDto,
      });
      if (!usuario) {
        throw new NotFoundException('Servicio no encontrado');
      }
      return await this.servicioRepository.save(usuario);
    } catch (error) {
      console.error(error);
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException('Error al obtener el servicio');
      }
    }
  }

  async remove(id: number) {
    try {
      const servicio = await this.findOneById(id);
      await this.servicioRepository.softRemove(servicio);
      return servicio;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error al eliminar el servicio');
    }
  }
}
