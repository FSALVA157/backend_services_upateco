import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsBoolean,
  Matches,
  Length,
  IsNotEmpty,
  IsInt,
} from 'class-validator';

export class CreateUsuarioDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Email del usuario',
  })
  @Matches(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/, {
    message: 'El formato del email no es válido.',
  })
  @Length(1, 100, {
    message:
      'El email debe tener entre $constraint1 y $constraint2 caracteres.',
  })
  @IsNotEmpty({ message: 'Debe ingresar el email.' })
  email: string;

  @ApiProperty({
    example: 'John',
    description: 'Nombre del usuario - No puede tener menos de dos letras',
    required: true,
  })
  @IsString()
  @Length(2, 100, {
    message:
      'El nombre debe tener entre $constraint1 y $constraint2 caracteres.',
  })
  @IsNotEmpty({ message: 'Debe ingresar el nombre.' })
  nombre: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Apellido del usuario - No puede tener menos de dos letras',
    required: true,
  })
  @IsString()
  @Length(2, 100, {
    message:
      'El apellido debe tener entre $constraint1 y $constraint2 caracteres.',
  })
  @IsNotEmpty({ message: 'Debe ingresar el apellido.' })
  apellido: string;

  @ApiProperty({
    example: 'Password123',
    description:
      'Contraseña del usuario-La clave debe tener una Mayuscula, una minuscula  y un número',
    required: true,
  })
  @IsString()
  @Length(8, 16, {
    message:
      'La clave debe tener entre $constraint1 y $constraint2 caracteres.',
  })
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'La clave debe tener una Mayuscula, una minuscula  y un número',
  })
  password: string;

  // @ApiProperty({
  //   example: true,
  //   description: 'Estado del usuario',
  //   required: false,
  // })
  // @IsBoolean()
  // @IsOptional()
  // isActive?: boolean;

  @ApiProperty({
    example: 1,
    description: 'ID del rol del usuario',
    required: true,
  })
  @IsInt()
  role_id: number;

  @ApiProperty({
    example: '+1234567890',
    description: 'Número de teléfono del usuario',
    required: false,
  })
  @IsString()
  @IsOptional()
  telefono?: string;

  @ApiProperty({
    example: 'Calle Trabajo 123',
    description: 'Domicilio laboral del usuario',
    required: false,
  })
  @IsString()
  @IsOptional()
  domicilio_laboral?: string;

  @ApiProperty({
    example: 'Calle Casa 456',
    description: 'Domicilio particular del usuario',
    required: false,
  })
  @IsString()
  @IsOptional()
  domicilio_particular?: string;
}
