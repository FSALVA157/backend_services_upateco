import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class LoginDto {
  @Matches(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/, {
    message: 'El formato del email no es válido.',
  })
  @Length(1, 100, {
    message:
      'El email debe tener entre $constraint1 y $constraint2 caracteres.',
  })
  @IsNotEmpty({ message: 'Debe ingresar el email.' })
  email: string;

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
