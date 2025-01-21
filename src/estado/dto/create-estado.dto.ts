import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateEstadoDto {
  @ApiProperty({
    description: 'nombre del estado',
    example: 'Tres valores posibles: aceptado, rechazado, pendiente',
  })
  @IsString()
  @IsNotEmpty({ message: 'El estado es requerido' })
  @Length(2, 50, {
    message: 'El estado debe tener entre 2 y 50 caracteres',
  })
  estado: string;
}
