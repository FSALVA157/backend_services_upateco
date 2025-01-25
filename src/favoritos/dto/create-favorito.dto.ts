import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateFavoritoDto {
  @ApiProperty({ description: 'ID del usuario que elije un servicio favorito' })
  @IsInt()
  @IsNotEmpty({ message: 'El ID del usuario es requerido' })
  usuario_id: number;

  @ApiProperty({ description: 'ID del servicio elegido como favorito' })
  @IsInt()
  @IsNotEmpty({ message: 'El ID del servicio es requerido' })
  servicio_id: number;
}
