import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateFavoritoDto } from './dto/create-favorito.dto';
import { UpdateFavoritoDto } from './dto/update-favorito.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorito } from './entities/favorito.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FavoritosService {
  constructor(
    @InjectRepository(Favorito)
    private readonly favoritoRepository: Repository<Favorito>,
  ) {}

  async create(createFavoritoDto: CreateFavoritoDto) {
    try {
      const newFavorito = this.favoritoRepository.create(createFavoritoDto);
      await this.favoritoRepository.save(newFavorito);
      return newFavorito;
    } catch (error) {
      console.error(error);
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException('Error al crear nuevo favorito');
      }
    }
  }

  async findAll() {
    try {
      return await this.favoritoRepository.find();
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error al obtener los favoritos');
    }
  }

  async findOne(id: number) {
    try {
      const favorito = await this.favoritoRepository.findOneBy({
        id_favorito: id,
      });
      if (!favorito) {
        throw new BadRequestException('Favorito no encontrado');
      }
      return favorito;
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
      const favoritos = await this.favoritoRepository.findBy({
        servicio_id: servicio_id,
      });
      if (!favoritos.length) {
        throw new NotFoundException(
          'No se encontraron favoritos para este servicio',
        );
      }
      return favoritos;
    } catch (error) {
      console.error(error);
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException(
          'Error al buscar favoritos por servicio',
        );
      }
    }
  }

  async findByOferente(oferente_id: number) {
    try {
      const favoritos = await this.favoritoRepository.findBy({
        usuario_id: oferente_id,
      });
      if (!favoritos.length) {
        throw new NotFoundException(
          'No se encontraron favoritos para este oferente',
        );
      }
      return favoritos;
    } catch (error) {
      console.error(error);
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException(
          'Error al buscar favoritos por oferente',
        );
      }
    }
  }

  async update(id: number, updateFavoritoDto: UpdateFavoritoDto) {
    try {
      const favorito = await this.favoritoRepository.preload({
        id_favorito: id,
        ...updateFavoritoDto,
      });
      if (!favorito) {
        throw new NotFoundException('Favorito no encontrado');
      }
      return await this.favoritoRepository.save(favorito);
    } catch (error) {
      console.error(error);
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException(
          'Error al actualizar el favorito',
        );
      }
    }
  }

  async remove(id: number) {
    try {
      const favorito = await this.findOne(id);
      await this.favoritoRepository.remove(favorito);
      return favorito;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error al eliminar el favorito');
    }
  }
}
