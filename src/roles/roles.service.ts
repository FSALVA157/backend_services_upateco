import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    try {
      const newRole = this.roleRepository.create(createRoleDto);
      await this.roleRepository.save(newRole);
      return newRole;
    } catch (error) {
      console.error(error);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al crear nuevo rol');
    }
  }

  async findAll() {
    try {
      return await this.roleRepository.find();
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error al obtener los roles');
    }
  }

  async findOne(id: number) {
    try {
      const role = await this.roleRepository.findOneBy({ id_role: id });
      if (!role) {
        throw new NotFoundException('Rol no encontrado');
      }
      return role;
    } catch (error) {
      console.error(error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al obtener el rol');
    }
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    try {
      const role = await this.roleRepository.preload({
        id_role: id,
        ...updateRoleDto,
      });
      if (!role) {
        throw new NotFoundException('Rol no encontrado');
      }
      return await this.roleRepository.save(role);
    } catch (error) {
      console.error(error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al actualizar el rol');
    }
  }

  async remove(id: number) {
    try {
      const role = await this.findOne(id);
      await this.roleRepository.remove(role);
      return role;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error al eliminar el rol');
    }
  }
}
