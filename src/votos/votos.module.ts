import { Module } from '@nestjs/common';
import { VotosService } from './votos.service';
import { VotosController } from './votos.controller';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Voto } from './entities/voto.entity';

@Module({
  controllers: [VotosController],
  providers: [VotosService],
  imports: [TypeOrmModule.forFeature([Voto])],
})
export class VotosModule {}
