import { Module } from '@nestjs/common';
import { SolicitudesService } from './solicitudes.service';
import { SolicitudesController } from './solicitudes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Solicitud } from './entities/solicitud.entity';

@Module({
  controllers: [SolicitudesController],
  providers: [SolicitudesService],
  imports: [TypeOrmModule.forFeature([Solicitud])],
})
export class SolicitudesModule {}
