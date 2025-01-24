import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateVotoDto } from './dto/create-voto.dto';
import { UpdateVotoDto } from './dto/update-voto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Voto } from './entities/voto.entity';

@Injectable()
export class VotosService {
  constructor(
    @InjectRepository(Voto)
    private readonly votoRepository: Repository<Voto>,
  ) {}

  async create(createVotoDto: CreateVotoDto) {
    try {
      const newVoto = this.votoRepository.create(createVotoDto);
      await this.votoRepository.save(newVoto);
      return newVoto;
    } catch (error) {
      console.error(error);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Error al crear nuevo voto: Revise que la solicitud no haya sido votada',
      );
    }
  }

  async findAll() {
    try {
      return await this.votoRepository.find();
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error al obtener los votos');
    }
  }

  async findOne(id: number) {
    try {
      const voto = await this.votoRepository.findOneBy({ id_voto: id });
      if (!voto) {
        throw new NotFoundException('Voto no encontrado');
      }
      return voto;
    } catch (error) {
      console.error(error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al buscar el voto');
    }
  }

  async findByOferente(oferente_id: number) {
    try {
      const votos = await this.votoRepository.findBy({
        oferente_id: oferente_id,
      });
      if (votos.length === 0) {
        throw new NotFoundException(
          'No se encontraron votos para este oferente',
        );
      }
      const promedio =
        votos.reduce((sum, voto) => sum + voto.voto, 0) / votos.length;
      return {
        oferente_id: oferente_id,
        promedio: promedio,
      };
    } catch (error) {
      console.error(error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Error al buscar votos para un oferente',
      );
    }
  }

  async update(id: number, updateVotoDto: UpdateVotoDto) {
    try {
      const voto = await this.votoRepository.preload({
        id_voto: id,
        ...updateVotoDto,
      });
      if (!voto) {
        throw new NotFoundException('Voto no encontrado');
      }
      return await this.votoRepository.save(voto);
    } catch (error) {
      console.error(error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al actualizar el voto');
    }
  }

  async remove(id: number) {
    try {
      const voto = await this.findOne(id);
      await this.votoRepository.remove(voto);
      return voto;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error al eliminar el voto');
    }
  }
}
