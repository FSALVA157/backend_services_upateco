import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SolicitudesService } from './solicitudes.service';
import { CreateSolicitudDto } from './dto/create-solicitud.dto';
import { UpdateSolicitudDto } from './dto/update-solicitud.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('solicitudes')
export class SolicitudesController {
  constructor(private readonly solicitudesService: SolicitudesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new request' })
  @ApiResponse({
    status: 201,
    description: 'The request has been successfully created.',
    type: CreateSolicitudDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createSolicitudeDto: CreateSolicitudDto) {
    return this.solicitudesService.create(createSolicitudeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all requests' })
  @ApiResponse({
    status: 200,
    description: 'Return all requests.',
  })
  findAll() {
    return this.solicitudesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a request by id' })
  @ApiResponse({
    status: 200,
    description: 'Return the request.',
  })
  @ApiResponse({ status: 404, description: 'Request not found.' })
  findOne(@Param('id') id: string) {
    return this.solicitudesService.findOne(+id);
  }

  @Get('/servicio/:id_service')
  @ApiOperation({
    summary: 'Solicitud de solicitudes según el id del Servicio en url param',
  })
  @ApiResponse({
    status: 200,
    description: 'listado de solicitudes para el servicio.',
  })
  @ApiResponse({
    status: 404,
    description: 'Solicitudes no encontradas o servicio inexistente.',
  })
  findManyByService(@Param('id_service') id_service: string) {
    return this.solicitudesService.findManyByService(+id_service);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a request' })
  @ApiResponse({
    status: 200,
    description: 'The request has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Request not found.' })
  update(
    @Param('id') id: string,
    @Body() updateSolicitudeDto: UpdateSolicitudDto,
  ) {
    return this.solicitudesService.update(+id, updateSolicitudeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a request' })
  @ApiResponse({
    status: 200,
    description: 'The request has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Request not found.' })
  remove(@Param('id') id: string) {
    return this.solicitudesService.remove(+id);
  }
}
