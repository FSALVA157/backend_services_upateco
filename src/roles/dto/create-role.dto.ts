import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({
    description: 'Rol del Usuario: oferente-buscador-ambos',
    example: 'oferente',
  })
  @IsString()
  @IsNotEmpty({ message: 'El rol es requerido' })
  @Length(2, 100, {
    message: 'El rol debe tener entre 10 y 500 caracteres',
  })
  rol: string;
}
