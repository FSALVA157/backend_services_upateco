import { Module } from '@nestjs/common';
import { RechazoService } from './rechazo.service';
import { RechazoController } from './rechazo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rechazo } from './entities/rechazo.entity';

@Module({
  controllers: [RechazoController],
  providers: [RechazoService],
  imports: [TypeOrmModule.forFeature([Rechazo])],
})
export class RechazoModule {}
