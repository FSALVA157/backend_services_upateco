import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateRechazoDto } from './dto/create-rechazo.dto';
import { UpdateRechazoDto } from './dto/update-rechazo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Rechazo } from './entities/rechazo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RechazoService {
  constructor(
    @InjectRepository(Rechazo)
    private readonly rechazoRepository: Repository<Rechazo>,
  ) {}

  async create(createRechazoDto: CreateRechazoDto) {
    try {
      const newRechazo = this.rechazoRepository.create(createRechazoDto);
      await this.rechazoRepository.save(newRechazo);
      return newRechazo;
    } catch (error) {
      console.error(error);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al crear nuevo rechazo');
    }
  }

  async findAll() {
    try {
      return await this.rechazoRepository.find();
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error al obtener los rechazos');
    }
  }

  async findOne(id: number) {
    try {
      const rechazo = await this.rechazoRepository.findOneBy({
        id_rechazo: id,
      });
      if (!rechazo) {
        throw new NotFoundException('Rechazo no encontrado');
      }
      return rechazo;
    } catch (error) {
      console.error(error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al obtener el rechazo');
    }
  }

  async update(id: number, updateRechazoDto: UpdateRechazoDto) {
    try {
      const rechazo = await this.rechazoRepository.preload({
        id_rechazo: id,
        ...updateRechazoDto,
      });
      if (!rechazo) {
        throw new NotFoundException('Rechazo no encontrado');
      }
      return await this.rechazoRepository.save(rechazo);
    } catch (error) {
      console.error(error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al actualizar el rechazo');
    }
  }

  async remove(id: number) {
    try {
      const rechazo = await this.findOne(id);
      await this.rechazoRepository.remove(rechazo);
      return rechazo;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error al eliminar el rechazo');
    }
  }
}
