import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login de Usuario' })
  @ApiResponse({
    status: 201,
    description: 'Usuario logueado.',
    type: LoginDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Los datos de login no son válidos ()',
  })
  async loginUsuario(
    @Body()
    loginUsuarioDto: LoginDto,
  ) {
    return this.authService.loginUsuario(loginUsuarioDto);
  }

  @Post('logout')
  @ApiOperation({ summary: 'Logout de Usuario' })
  @ApiResponse({
    status: 201,
    description: 'Usuario deslogueado.',
  })
  async logoutUsuario() {
    return this.authService.logoutUsuario();
  }
}
