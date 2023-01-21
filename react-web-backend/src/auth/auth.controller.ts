import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { GetUser } from './decorator/get-user.decorator';
import { ChangeUserPasswordDto } from './dto/change-user-password.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ForgotUserPasswordDto } from './dto/forgot-user-password.dto';
import { ResetUserPasswordDto } from './dto/reset-user-password.dto';
import { UserSignupDto } from './dto/user-signup.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Post('/signup')
  async signup(@Body() userSignupDto: UserSignupDto) {
    return await this.authService.signup(userSignupDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Body() createAuthDto: CreateAuthDto) {
    return await this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('profile')
  async getProfile(@Request() req) {
    return await this.authService.getProfile(req.user.id);
  }

  @UseGuards(JwtRefreshAuthGuard)
  @ApiBearerAuth()
  @Get('/refresh')
  refreshTokens(
    @GetUser()
    user: {
      sub: number;
      refreshToken: string;
    },
  ) {
    return this.authService.refreshTokens(user.sub, user.refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('/logout')
  logout(@GetUser() user: { id: number; userName: string }) {
    return this.authService.logout(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('changePassword')
  async changePassword(
    @GetUser() user: { id: number; userName: string },
    @Body() changeUserPasswordDto: ChangeUserPasswordDto,
  ) {
    return await this.authService.changeUserPassword(
      changeUserPasswordDto,
      user,
    );
  }

  @Post('forgotPassword')
  async forgotPassword(
    @Body() forgotUserPasswordUserDto: ForgotUserPasswordDto,
  ) {
    return await this.authService.forgotPassword(
      forgotUserPasswordUserDto.email,
    );
  }

  @Post('resetPassword')
  async resetPassword(@Body() resetUserPasswordDto: ResetUserPasswordDto) {
    return await this.authService.resetPassword(resetUserPasswordDto);
  }
}
