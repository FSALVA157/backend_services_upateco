import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    try {
      const newUsuario = this.usuarioRepository.create(createUsuarioDto);
      await this.usuarioRepository.save(newUsuario);
      return {
        ...newUsuario,
        token: this.getJwtToken({ email: newUsuario.email }),
      };
    } catch (error) {
      console.error(error);
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException('Error al crear nuevo usuario');
      }
    }
  }

  async findAll() {
    try {
      return await this.usuarioRepository.find({
        relations: ['favoritos', 'favoritos.servicio'],
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error al obtener los usuarios');
    }
  }

  async findOne(id: number) {
    try {
      const usuario = await this.usuarioRepository.findOneBy({
        id_usuario: id,
      });
      if (!usuario) {
        throw new NotFoundException('Usuario no encontrado');
      }
      return usuario;
    } catch (error) {
      console.error(error);
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException('Error al obtener el usuario');
      }
    }
  }

  async findOneByEmail(email: string) {
    try {
      const usuario = await this.usuarioRepository.findOneBy({
        email: email,
      });
      if (!usuario) {
        throw new NotFoundException('Usuario no encontrado');
      }
      return usuario;
    } catch (error) {
      console.error(error);
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException('Error al obtener el usuario');
      }
    }
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    try {
      const usuario = await this.usuarioRepository.preload({
        id_usuario: id,
        ...updateUsuarioDto,
      });
      if (!usuario) {
        throw new NotFoundException('Usuario no encontrado');
      }
      return await this.usuarioRepository.save(usuario);
    } catch (error) {
      console.error(error);
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException('Error al obtener el usuario');
      }
    }
  }

  async remove(id: number) {
    try {
      const usuario = await this.findOne(id);
      await this.usuarioRepository.softRemove(usuario);
      return usuario;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error al eliminar el usuario');
    }
  }

  //RETORNAR TOKEN
  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);

    return token;
  }
}
