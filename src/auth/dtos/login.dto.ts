import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'juan@gmail.com',
    description: 'Email del usuario',
    required: true,
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
  clave: string;
}
