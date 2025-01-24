import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
  Length,
} from 'class-validator';

export class CreateVotoDto {
  @ApiProperty({ description: 'ID de la solicitud asociada' })
  @IsInt()
  @IsNotEmpty({ message: 'El ID de la solicitud es requerido' })
  solicitud_id: number;

  @ApiProperty({ description: 'ID del oferente' })
  @IsInt()
  @IsNotEmpty({ message: 'El ID del oferente es requerido' })
  oferente_id: number;

  @ApiProperty({
    description: 'Valor del voto',
    example: 'solo se puede una vez y puede ser 1 a 5',
    minimum: 1,
    maximum: 5,
  })
  @IsInt()
  @IsNotEmpty({ message: 'El valor del voto es requerido' })
  @Min(1, { message: 'El voto mínimo es 1' })
  @Max(5, { message: 'El voto máximo es 5' })
  voto: number;

  @ApiProperty({ description: 'Comentario opcional del voto' })
  @IsString()
  @IsOptional()
  @Length(0, 255, {
    message: 'El comentario no puede exceder los 255 caracteres',
  })
  comentario?: string;
}
