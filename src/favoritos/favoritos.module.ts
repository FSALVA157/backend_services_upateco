import { Module } from '@nestjs/common';
import { FavoritosService } from './favoritos.service';
import { FavoritosController } from './favoritos.controller';
import { Favorito } from './entities/favorito.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [FavoritosController],
  providers: [FavoritosService],
  imports: [TypeOrmModule.forFeature([Favorito])],
})
export class FavoritosModule {}
