import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ServiciosService } from './servicios.service';
import { CreateServicioDto } from './dto/create-servicio.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';

@Controller('servicios')
export class ServiciosController {
  constructor(private readonly serviciosService: ServiciosService) {}

  @Post()
  create(@Body() createServicioDto: CreateServicioDto) {
    return this.serviciosService.create(createServicioDto);
  }

  @Get()
  findAll() {
    return this.serviciosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviciosService.findOneById(+id);
  }

  @Get('/titulo/:texto')
  findOneByTitle(@Param('texto') texto: string) {
    return this.serviciosService.findOneByTitulo(texto);
  }

  @Get('/categoria/:id_categoria')
  findManyByCategory(@Param('id_categoria') id_categoria: number) {
    return this.serviciosService.findByCategoria(id_categoria);
  }

  @Get('/usuario/:id_user')
  findManyByUser(@Param('id_user') user_id: number) {
    return this.serviciosService.findByUser(user_id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateServicioDto: UpdateServicioDto,
  ) {
    return this.serviciosService.update(+id, updateServicioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviciosService.remove(+id);
  }
}
