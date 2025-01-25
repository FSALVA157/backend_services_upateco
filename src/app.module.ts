import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './common/common.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';
import { ServiciosModule } from './servicios/servicios.module';
import { RolesModule } from './roles/roles.module';
import { CategoriaModule } from './categoria/categoria.module';
import { SolicitudesModule } from './solicitudes/solicitudes.module';
import { RechazoModule } from './rechazo/rechazo.module';
import { EstadoModule } from './estado/estado.module';
import { VotosModule } from './votos/votos.module';
import { FavoritosModule } from './favoritos/favoritos.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    CommonModule,
    UsuarioModule,
    AuthModule,
    ServiciosModule,
    RolesModule,
    CategoriaModule,
    SolicitudesModule,
    RechazoModule,
    EstadoModule,
    VotosModule,
    FavoritosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
