import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable() //se lo decora con injectable porque es un provider (servicio)
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,

    configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<Usuario> {
    const { email } = payload;

    const usuario = await this.usuarioRepository.findOneBy({ email });

    if (!usuario) throw new UnauthorizedException('Token no es valido.');

    if (usuario.deletedAt)
      throw new UnauthorizedException('Usuario ha sido eliminado.');
    return usuario;
  }
}
