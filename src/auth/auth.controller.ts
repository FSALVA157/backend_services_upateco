import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async loginUsuario(
    @Body()
    loginUsuarioDto: LoginDto,
  ) {
    return this.authService.loginUsuario(loginUsuarioDto);
  }

  @Post('logout')
  async logoutUsuario() {
    return this.authService.logoutUsuario();
  }
}
