import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  Response,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ChangeUserPasswordDto } from './dto/change-user-password.dto';
import { ForgotUserPasswordDto } from './dto/forgot-user-password.dto';
import { ResetUserPasswordDto } from './dto/reset-user-password.dto';
import { AuthService } from './auth.service';
import { GetUser } from './decorator/get-user.decorator';
import { CreateAuthDto } from './dto/create-auth.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiResponse({
    status: 200,
    schema: {
      type: 'object',
      example: {
        access_token: 'string',
        refresh_token: 'string',
        expires_in: 'number',
        token_type: 'string',
      },
    },
  })
  @Post('login')
  async login(
    @Request() request,
    @Body() createAuthDto: CreateAuthDto,
    @Response({ passthrough: true }) res,
  ) {
    return await this.authService.login(request.user, res, request);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('changePassword')
  async changePassword(
    @GetUser() user: { id: number; email: string },
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

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('profile')
  async getProfile(
    @Request() req,
    @GetUser() user: { id: number; userName: string },
  ) {
    console.log(req.cookies);
    return await this.authService.getProfile(user.id);
  }

  @Get('logout')
  async getlogout(
    @Request() req,

    @Response({ passthrough: true }) res,
  ) {
    console.log(req.cookies);
    return await this.authService.logout(req, res);
  }

  // @UseGuards(JwtRefreshAuthGuard)
  // @ApiBearerAuth()
  @Get('/refresh')
  async refreshTokens(@Request() req, @Response({ passthrough: true }) res) {
    return await this.authService.refreshTokens(
      res,
      req,
      req.cookies.refreshToken,
    );
  }
}
