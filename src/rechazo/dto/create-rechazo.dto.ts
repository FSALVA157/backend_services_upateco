import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateRechazoDto {
  @ApiProperty({
    description: 'Descripción del motivo de rechazo',
    example: 'No se puede realizar el servicio',
  })
  @IsString()
  @IsNotEmpty({ message: 'El motivo de rechazo es requerido' })
  @Length(2, 100, {
    message: 'El motivo debe tener entre 2 y 100 caracteres',
  })
  rechazo_motivo: string;
}
