import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateEstadoDto } from './dto/create-estado.dto';
import { UpdateEstadoDto } from './dto/update-estado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Estado } from './entities/estado.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EstadoService {
  constructor(
    @InjectRepository(Estado)
    private readonly estadoRepository: Repository<Estado>,
  ) {}

  async create(createEstadoDto: CreateEstadoDto) {
    try {
      const newEstado = this.estadoRepository.create(createEstadoDto);
      await this.estadoRepository.save(newEstado);
      return newEstado;
    } catch (error) {
      console.error(error);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al crear nuevo estado');
    }
  }

  async findAll() {
    try {
      return await this.estadoRepository.find();
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error al obtener los estados');
    }
  }

  async findOne(id: number) {
    try {
      const estado = await this.estadoRepository.findOneBy({
        id_estado: id,
      });
      if (!estado) {
        throw new NotFoundException('Estado no encontrado');
      }
      return estado;
    } catch (error) {
      console.error(error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al obtener el estado');
    }
  }

  async update(id: number, updateEstadoDto: UpdateEstadoDto) {
    try {
      const estado = await this.estadoRepository.preload({
        id_estado: id,
        ...updateEstadoDto,
      });
      if (!estado) {
        throw new NotFoundException('Estado no encontrado');
      }
      return await this.estadoRepository.save(estado);
    } catch (error) {
      console.error(error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al actualizar el estado');
    }
  }

  async remove(id: number) {
    try {
      const estado = await this.findOne(id);
      await this.estadoRepository.remove(estado);
      return estado;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error al eliminar el estado');
    }
  }
}
