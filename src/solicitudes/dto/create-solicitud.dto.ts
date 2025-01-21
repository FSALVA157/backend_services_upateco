import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateSolicitudDto {
  @ApiProperty({ description: 'ID del usuario oferente', example: 1 })
  @IsNumber()
  @IsNotEmpty({ message: 'El oferente es requerido' })
  oferente_id: number;

  @ApiProperty({ description: 'ID del usuario buscador', example: 1 })
  @IsNumber()
  @IsNotEmpty({ message: 'El buscador es requerido' })
  buscador_id: number;

  @ApiProperty({
    description: 'ID del servicio que origina el pedido',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty({ message: 'El servicio es requerido' })
  servicio_id: number;

  @ApiProperty({
    description: 'Comentario de la solicitud',
    example: 'Necesito el servicio para esta semana',
  })
  @IsString()
  @IsOptional()
  @Length(10, 500, {
    message: 'El comentario debe tener entre 10 y 500 caracteres',
  })
  comentario: string;

  @ApiProperty({ description: 'ID del estado de la solicitud', example: 1 })
  @IsNumber()
  @IsOptional()
  estado_id?: number;

  @ApiProperty({ description: 'ID del motivo de rechazo', example: 1 })
  @IsNumber()
  @IsOptional()
  rechazo_motivo_id?: number;

  @ApiProperty({
    description: 'Estado de finalización',
    enum: ['finalizado', 'cancelado'],
  })
  @IsString()
  @IsOptional()
  @IsEnum(['finalizado', 'cancelado'], {
    message: 'El estado final debe ser "finalizado" o "cancelado"'
  })
  estado_final: 'finalizado' | 'cancelado';

  @ApiProperty({
    description: 'Comentario de cierre',
    example: 'Problemas personales - No puedo continuar con el servicio',
  })
  @IsString()
  @IsOptional()
  @Length(10, 500, {
    message: 'El motivo de cierre debe tener entre 10 y 500 caracteres',
  })
  motivo_cierre?: string;

  @ApiProperty({ description: 'Fecha de cierre de la solicitud' })
  @IsOptional()
  fecha_cierra: Date;
}
