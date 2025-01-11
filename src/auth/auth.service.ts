import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dtos/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async loginUsuario(loginUsuarioDto: LoginDto) {
    const { email, clave } = loginUsuarioDto;
    const usuario = await this.usuarioRepository
      .createQueryBuilder('usuario')
      .where('usuario.email = :email', { email })
      .select(['usuario.email', 'usuario.password'])
      .getOne();

    if (!usuario)
      throw new UnauthorizedException(
        'Los datos de login no son válidos (email)',
      );

    if (!bcrypt.compareSync(clave, usuario.password))
      throw new UnauthorizedException(
        'Los datos de login no son válidos (clave)',
      );

    const usuarioValido = await this.usuarioRepository.findOneBy({
      email: email,
    });

    return {
      ...usuarioValido,
    };
  }

  async logoutUsuario() {
    return {
      message: 'Usuario deslogueado',
    };
  }
}
