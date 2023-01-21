import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { errorhandler, successHandler } from '../util/response.handler';
import { jwtConstants } from './constants';
import { DBService } from '../database.service';
import { sendMailTest } from '../util/send-mail';
import { UserService } from '../user/user.service';
import { ChangeUserPasswordDto } from './dto/change-user-password.dto';
import { ResetUserPasswordDto } from './dto/reset-user-password.dto';
import { ClinicService } from 'src/clinic/clinic.service';
const saltOrRounds = 10;

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly clinicService: ClinicService,
    private readonly jwtService: JwtService,
    private readonly prisma: DBService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findbyEmail(email);

    // That's weird. If a password is numeric, it's converted as number
    if (user && (await bcrypt.compare(String(pass), user.password))) {
      const { ...result } = user;
      return result;
    } else return;
  }

  async getTokens(userId: number, email: string, companyId?: number) {
    let payload: any = { sub: userId, email };
    if (companyId) {
      payload = { sub: userId, email, companyId };
    }

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: jwtConstants.secret,
        expiresIn: jwtConstants.expires_in,
      }),
      this.jwtService.signAsync(payload, {
        secret: jwtConstants.REFRESH_TOKEN_SECRET,
        expiresIn: jwtConstants.REFRESH_TOKEN_EXPIRATION,
      }),
    ]);

    return {
      access_token: access_token,
      refresh_token: refresh_token,
    };
  }

  async getProfile(id: number) {
    try {
      const userInfo = await this.prisma.user.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          fullName: true,
          userName: true,
          role: true,
          phone: true,
          email: true,
          createdDate: true,
          lastModifiedDate: true,
          lastModifiedBy: true,
          companyUser: {
            select: {
              company: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });
      return successHandler(userInfo, 'Success');
    } catch (error) {
      return errorhandler(400, JSON.stringify(error.message));
    }
  }

  async login(user: any, res: any, req: any) {
    try {
      if (user.hasOwnProperty('statusCode')) {
        return user;
      }
      const userInfo = await this.prisma.user.findUnique({
        where: {
          id: user.id,
        },
        select: {
          id: true,
          fullName: true,
          userName: true,
          role: true,
          phone: true,
          email: true,
          createdDate: true,
          lastModifiedDate: true,
          lastModifiedBy: true,
          companyUser: {
            select: {
              companyId: true,
            },
          },
        },
      });
      const tokens = await this.getTokens(
        user.id,
        user.email,
        userInfo?.companyUser?.companyId,
      );
      res.cookie('refreshToken', tokens.refresh_token, {
        expires: new Date(new Date().setDate(new Date().getDate() + 7)),
        // sameSite: 'none',
        httpOnly: true,
        // secure: false,
        domain: 'drsdev.kaz.com.bd',
        path: '/drs/auth/refresh',
      });
      res.header('Access-Control-Allow-Origin', req.headers.origin);
      return successHandler(
        {
          access_token: tokens.access_token,
          refresh_token: tokens.refresh_token,
          expires_in: jwtConstants.expires_in,
          token_type: 'Bearer',
          user_profile: userInfo,
        },
        'Authenticated!',
      );
    } catch (error) {
      return errorhandler(400, JSON.stringify(error.message));
    }

    // Prepare the payload as a common response
  }

  async logout(req: any, res: any) {
    try {
      res.header('Access-Control-Allow-Origin', req.headers.origin);
      // res.cookie('refreshToken', '', {
      //   expires: new Date(new Date().setDate(new Date().getDate())),
      //   // sameSite: 'none',
      //   httpOnly: true,
      //   // secure: false,
      //   domain: 'drsdev.kaz.com.bd',
      //   path: '/drs/auth/refresh',
      // });
      res.clearCookie('refreshToken', {
        httpOnly: true,
        domain: 'drsdev.kaz.com.bd',
        path: '/drs/auth/refresh',
      });
      return successHandler({}, 'Logout!');
    } catch (error) {
      return errorhandler(400, JSON.stringify(error.message));
    }
  }

  async changeUserPassword(
    changeUserPasswordDto: ChangeUserPasswordDto,
    user: { id: number; email: string },
  ) {
    try {
      const userWithOldPassword = await this.prisma.user.findUnique({
        where: { id: user.id },
        select: {
          password: true,
        },
      });

      if (
        !(await bcrypt.compare(
          String(changeUserPasswordDto.oldPassword),
          userWithOldPassword.password,
        ))
      ) {
        return errorhandler(401, 'Wrong Password');
      }

      if (
        changeUserPasswordDto.confirmPassword !==
        changeUserPasswordDto.newPassword
      ) {
        return errorhandler(
          401,
          'Confirm password does not match with your new password',
        );
      }

      const salt = await bcrypt.genSalt(saltOrRounds);
      const encPassword = await bcrypt.hash(
        changeUserPasswordDto.newPassword,
        salt,
      );

      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          password: encPassword,
          lastModifiedBy: user.id,
          lastModifiedDate: new Date(),
        },
      });
      return successHandler({}, 'Password Changed');
    } catch (error) {
      console.log('Error', error);
    }
  }

  async forgotPassword(email: string) {
    try {
      const token = Math.floor(1000 + Math.random() * 900_000).toString();
      const user = await this.prisma.user.findFirst({
        where: { email: email },
      });
      if (!user) {
        return errorhandler(
          401,
          'User not found with the provided email address',
        );
      }

      const userWithAVerificationCode =
        await this.prisma.resetPasswordToken.findUnique({
          where: { userEmail: email },
        });

      await (userWithAVerificationCode
        ? this.prisma.resetPasswordToken.update({
            where: { userEmail: email },
            data: {
              token: token,
              createdDate: new Date(),
            },
          })
        : this.prisma.resetPasswordToken.create({
            data: {
              token: token,
              userEmail: email,
            },
          }));
      let emailConfig = {
        receiver: email,
        subject: 'Confirm Your Email',
        textContent: `Verification Code`,
        htmlContent: `
            <p>Hey ${email},</p>
            <p>Please use the code below to confirm your email</p>
            <h1>
                ${token.toString()}
            </h1>
            <p>If you did not request this email you can safely ignore it.</p>
                      `,
      };
      return await sendMailTest(emailConfig);
    } catch (error) {
      return errorhandler(400, JSON.stringify(error.message));
    }
  }

  async resetPassword(resetUserPasswordDto: ResetUserPasswordDto) {
    const userResetPasswordTokenInfo =
      await this.prisma.resetPasswordToken.findFirst({
        where: { token: resetUserPasswordDto.token },
      });

    if (!userResetPasswordTokenInfo) {
      return errorhandler(401, 'Invalid Verification Code');
    }

    const now = new Date();

    if (
      userResetPasswordTokenInfo.createdDate.getTime() + 5 * 60_000 <
      now.getTime()
    ) {
      return errorhandler(500, 'Verifiaction code Expired');
    }

    if (
      userResetPasswordTokenInfo.token !== resetUserPasswordDto.token ||
      userResetPasswordTokenInfo.userEmail !== resetUserPasswordDto.email
    ) {
      return errorhandler(401, 'Invalid Verification Code');
    }

    if (
      resetUserPasswordDto.confirmPassword !== resetUserPasswordDto.newPassword
    ) {
      return errorhandler(
        401,
        'Confirm password does not match with your new password',
      );
    }
    const userToUpdate = await this.prisma.user.findUnique({
      where: { email: userResetPasswordTokenInfo.userEmail },
    });

    try {
      await this.prisma.$transaction(async (prisma) => {
        if (!userToUpdate) {
          return errorhandler(404, 'User Not Found');
        }

        await prisma.resetPasswordToken.delete({
          where: { userEmail: userToUpdate.email },
        });
        const salt = await bcrypt.genSalt(saltOrRounds);
        const encPassword = await bcrypt.hash(
          resetUserPasswordDto.newPassword,
          salt,
        );

        await prisma.user.update({
          where: { email: userToUpdate.email },
          data: {
            password: encPassword,
            lastModifiedBy: userToUpdate.id,
            lastModifiedDate: new Date(),
          },
        });
      });

      return successHandler({}, 'Password Changed successfully');
    } catch (error) {
      console.log(error);
      return errorhandler(504, 'Something went wrong. Please try again.');
    }
  }

  async refreshTokens(res: any, req: any, token: string) {
    try {
      res.header('Access-Control-Allow-Origin', req.headers.origin);
      const decodedJwtRefreshToken: any = this.jwtService.decode(token);
      if (!decodedJwtRefreshToken) {
        throw new ForbiddenException('Access Denied');
      }
      const expires = decodedJwtRefreshToken.exp;
      if (expires < (new Date().getTime() + 1) / 1000) {
        throw new ForbiddenException('Access Denied');
      }
      if (decodedJwtRefreshToken.mobile) {
        const result = await this.clinicService.refreshTokens(
          decodedJwtRefreshToken.mobile,
        );
        return successHandler(result, 'Success');
      }
      const user = await this.prisma.user.findUnique({
        where: {
          id: decodedJwtRefreshToken.sub,
        },
        select: {
          id: true,
          fullName: true,
          userName: true,
          role: true,
          phone: true,
          email: true,
          createdDate: true,
          lastModifiedDate: true,
          lastModifiedBy: true,
          companyUser: {
            select: {
              companyId: true,
            },
          },
        },
      });
      if (!user) throw new ForbiddenException('Access Denied');
      const tokens = await this.getTokens(
        user.id,
        user.email,
        user.companyUser?.companyId,
      );
      return successHandler(
        {
          access_token: tokens.access_token,
          refresh_token: tokens.refresh_token,
          expires_in: jwtConstants.expires_in,
          token_type: 'Bearer',
          user_profile: user,
        },
        'Success',
      );
    } catch (error) {
      return errorhandler(400, JSON.stringify(error.message));
    }
  }
}
