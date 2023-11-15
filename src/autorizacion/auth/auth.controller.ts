import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MessageResponse } from '../../shared/entities/message-response';
import { MessageEnum } from '../../shared/enums/message.enum';
import { UsuarioEntity } from '../usuario/entities/usuario.entity';
import { AuthService } from './auth.service';
import { ApiAuthRefreshResponse, ApiAuthResponse } from './decorators/api-auth.decorator';
import { Public } from './decorators/auth-public.decorator';
import { GetCurrentUserId } from './decorators/get-current-user-id.decorator';
import { GetUser } from './decorators/get-user.decorator';
import { AuthLoginDto } from './dto/auth-login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtRefreshTokenGuard } from './guards/jwt-refresh.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Proceso de Autenticación de un Usuario', description: 'usuario: <123456> y <test>' })
  @ApiAuthResponse({ model: UsuarioEntity, description: MessageEnum.AUTHENTICATED })
  login(@Body() authLoginDto: AuthLoginDto): Promise<MessageResponse<any>> {
    return this.authService.login(authLoginDto);
  }

  @Get('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Anulación del token de actualización de un Usuario' })
  logout(@GetUser() usuario: UsuarioEntity) {
    return this.authService.logout(usuario.id);
  }

  @Public()
  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtRefreshTokenGuard)
  @ApiOperation({ summary: 'Renovación del token de actualización de un Usuario' })
  @ApiAuthRefreshResponse(MessageEnum.AUTHENTICATED)
  async refreshToken(
    @GetCurrentUserId() userId: number,
    //@GetUser() user: UsuarioEntity, @Body() token: RefreshTokenDto
    //@GetUser('refreshToken') refreshToken: any,
    @Body() refreshToken: RefreshTokenDto,
  ) {
    const usuario = await this.authService.getUserIfRefreshTokenMatches2(refreshToken.refreshToken, userId);
    if (usuario) {
      const payload = { sub: usuario.id };
      return this.authService.getNewAccessAndRefreshToken(payload);
    } else {
      return null;
    }
  }
}
