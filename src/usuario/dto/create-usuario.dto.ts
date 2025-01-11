import {
  IsString,
  IsEmail,
  MinLength,
  IsArray,
  IsOptional,
  IsBoolean,
  Matches,
  Length,
  IsNotEmpty,
  IsInt,
} from 'class-validator';

export class CreateUsuarioDto {
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
  @Length(2, 100, {
    message:
      'El nombre debe tener entre $constraint1 y $constraint2 caracteres.',
  })
  @IsNotEmpty({ message: 'Debe ingresar el nombre.' })
  nombre: string;

  @IsString()
  @Length(2, 100, {
    message:
      'El apellido debe tener entre $constraint1 y $constraint2 caracteres.',
  })
  @IsNotEmpty({ message: 'Debe ingresar el apellido.' })
  apellido: string;

  @IsString()
  @Length(8, 16, {
    message:
      'La clave debe tener entre $constraint1 y $constraint2 caracteres.',
  })
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'La clave debe tener una Mayuscula, una minuscula  y un número',
  })
  password: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsInt()
  role_id: number;

  @IsString()
  @IsOptional()
  telefono?: string;

  @IsString()
  @IsOptional()
  domicilio_laboral?: string;

  @IsString()
  @IsOptional()
  domicilio_particular?: string;
}
