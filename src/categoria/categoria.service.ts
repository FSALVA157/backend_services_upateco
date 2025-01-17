import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from './entities/categoria.entity';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}

  async create(createCategoriaDto: CreateCategoriaDto) {
    try {
      const newCategoria = this.categoriaRepository.create(createCategoriaDto);
      await this.categoriaRepository.save(newCategoria);
      return newCategoria;
    } catch (error) {
      console.error(error);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al crear nueva categoría');
    }
  }

  async findAll() {
    try {
      return await this.categoriaRepository.find();
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error al obtener las categorías');
    }
  }

  async findOne(id: number) {
    try {
      const categoria = await this.categoriaRepository.findOneBy({
        id_categoria: id,
      });
      if (!categoria) {
        throw new NotFoundException('Categoría no encontrada');
      }
      return categoria;
    } catch (error) {
      console.error(error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al obtener la categoría');
    }
  }

  async update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    try {
      const categoria = await this.categoriaRepository.preload({
        id_categoria: id,
        ...updateCategoriaDto,
      });
      if (!categoria) {
        throw new NotFoundException('Categoría no encontrada');
      }
      return await this.categoriaRepository.save(categoria);
    } catch (error) {
      console.error(error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Error al actualizar la categoría',
      );
    }
  }

  async remove(id: number) {
    try {
      const categoria = await this.findOne(id);
      await this.categoriaRepository.remove(categoria);
      return categoria;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error al eliminar la categoría');
    }
  }
}
