import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateSolicitudDto } from './dto/create-solicitud.dto';
import { UpdateSolicitudDto } from './dto/update-solicitud.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Solicitud } from './entities/solicitud.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SolicitudesService {
  constructor(
    @InjectRepository(Solicitud)
    private readonly solicitudRepository: Repository<Solicitud>,
  ) {}

  async create(createSolicitudDto: CreateSolicitudDto) {
    try {
      const newSolicitud = this.solicitudRepository.create(createSolicitudDto);
      await this.solicitudRepository.save(newSolicitud);
      return newSolicitud;
    } catch (error) {
      console.error(error);
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException(
          'Error al crear nueva solicitud',
        );
      }
    }
  }

  async findAll() {
    try {
      return await this.solicitudRepository.find();
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'Error al obtener las solicitudes',
      );
    }
  }

  async findOne(id: number) {
    try {
      const solicitud = await this.solicitudRepository.findOneBy({
        id_solicitud: id,
      });
      if (!solicitud) {
        throw new BadRequestException('Solicitud no encontrada');
      }
      return solicitud;
    } catch (error) {
      console.error(error);
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException('Error al buscar por id');
      }
    }
  }

  async findByServicio(servicio_id: number) {
    try {
      const solicitudes = await this.solicitudRepository.findBy({
        servicio_id: servicio_id,
      });
      if (!solicitudes.length) {
        throw new NotFoundException(
          'No se encontraron solicitudes para este servicio',
        );
      }
      return solicitudes;
    } catch (error) {
      console.error(error);
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException(
          'Error al buscar solicitudes por servicio',
        );
      }
    }
  }

  async findByOferente(oferente_id: number) {
    try {
      const solicitudes = await this.solicitudRepository.findBy({
        oferente_id: oferente_id,
      });
      if (!solicitudes.length) {
        throw new NotFoundException(
          'No se encontraron solicitudes para este oferente',
        );
      }
      return solicitudes;
    } catch (error) {
      console.error(error);
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException(
          'Error al buscar solicitudes por oferente',
        );
      }
    }
  }

  async update(id: number, updateSolicitudDto: UpdateSolicitudDto) {
    try {
      const solicitud = await this.solicitudRepository.preload({
        id_solicitud: id,
        ...updateSolicitudDto,
      });
      if (!solicitud) {
        throw new NotFoundException('Solicitud no encontrada');
      }
      return await this.solicitudRepository.save(solicitud);
    } catch (error) {
      console.error(error);
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException(
          'Error al actualizar la solicitud',
        );
      }
    }
  }

  async remove(id: number) {
    try {
      const solicitud = await this.findOne(id);
      await this.solicitudRepository.softRemove(solicitud);
      return solicitud;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error al eliminar la solicitud');
    }
  }
}
