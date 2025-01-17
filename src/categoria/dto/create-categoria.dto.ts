import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateCategoriaDto {
  @ApiProperty({
    description: 'Categoría del servicio ofrecido',
    example: 'limpieza, plomería, electricidad',
  })
  @IsString()
  @IsNotEmpty({ message: 'La categoría es requerida' })
  @Length(2, 100, {
    message: 'La categoría debe tener entre 10 y 500 caracteres',
  })
  categoria: string;
}
