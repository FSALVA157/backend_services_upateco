import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsBoolean,
  IsNotEmpty,
  Length,
  IsOptional,
} from 'class-validator';

export class CreateServicioDto {
  @ApiProperty({
    description: 'Id del Usuario Autor',
    example: 10,
  })
  @IsNumber()
  @IsNotEmpty({ message: 'El usuario es requerido' })
  usuario_id: number;

  @ApiProperty({
    description: 'Título del servicio',
    example: 'Servicio de limpieza',
  })
  @IsString()
  @IsNotEmpty({ message: 'El título es requerido' })
  @Length(3, 100, { message: 'El título debe tener entre 3 y 100 caracteres' })
  titulo: string;

  @ApiProperty({
    description: 'Descripción del servicio',
    example: 'Servicio completo de limpieza del hogar',
  })
  @IsString()
  @IsNotEmpty({ message: 'La descripción es requerida' })
  @Length(10, 500, {
    message: 'La descripción debe tener entre 10 y 500 caracteres',
  })
  descripcion: string;

  @ApiProperty({ description: 'ID de la categoría', example: 1 })
  @IsNumber()
  @IsNotEmpty({ message: 'La categoría es requerida' })
  categoria_id: number;

  @ApiProperty({
    description: 'Duración en minutos horas o días',
    example: '6 días, 5 horas',
  })
  @IsString()
  @IsNotEmpty({ message: 'La duración es requerida' })
  duracion: string;

  @ApiProperty({
    description: 'Horario disponible',
    example: 'Lunes a Viernes 9:00-18:00',
  })
  @IsString()
  @IsNotEmpty({ message: 'El horario es requerido' })
  horario: string;

  @ApiProperty({
    description: 'Estado del servicio(false: en pausa, true: activo)',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  estado?: boolean;
}
