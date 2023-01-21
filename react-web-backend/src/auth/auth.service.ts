import { ForbiddenException, Injectable } from '@nestjs/common';
import { CompanyUsersService } from '../companyUsers/companyUsers.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { created, errorhandler, successHandler } from 'src/util/response.handler';
import { jwtConstants } from './constants';
import { DBService } from 'src/db.service';
import { ChangeUserPasswordDto } from './dto/change-user-password.dto';
import { sendMailTest } from 'src/util/sendMailTwo';
import { ResetUserPasswordDto } from './dto/reset-user-password.dto';
import { UserSignupDto } from './dto/user-signup.dto';
import { role } from 'src/util/constant';
const saltOrRounds = 10;

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: CompanyUsersService,
    private readonly jwtService: JwtService,
    private readonly prisma: DBService,
  ) {}

  async signup(userSignupDto: UserSignupDto) {
    try {
      if(userSignupDto.password !== userSignupDto.confirmPassword){
        return errorhandler(400, `Password doesn't match`); 
      }
      // Generate a salt
      const salt = await bcrypt.genSalt(saltOrRounds);
      const encPassword = await bcrypt.hash(userSignupDto.password, salt);
      const result = await this.prisma.companyUser.create({
        data: {
          ...userSignupDto,
          role: role.USER,
          password: encPassword,
        },
        select: {
          // Since we return only 5 fields, we need to set return type partial
          id: true,
          fullName: true,
          userName: true,
          role: true,
          phone: true,
          email: true,
          createdDate: true,
          lastModifiedDate: true,
          lastModifiedBy: true,
        },
      });
      return created(result);
    } catch (err) {
      return errorhandler(400, JSON.stringify(err.message));
    }
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findbyUserName(username);
    // That's weird. If a password is numeric, it's converted as number
    if (user && (await bcrypt.compare(String(pass), user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async getTokens(userId: number, userName: string) {
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, userName },
        { secret: jwtConstants.secret, expiresIn: jwtConstants.expires_in },
      ),
      this.jwtService.signAsync(
        { sub: userId, userName },
        {
          secret: jwtConstants.REFRESH_TOKEN_SECRET,
          expiresIn: jwtConstants.REFRESH_TOKEN_EXPIRATION,
        },
      ),
    ]);

    return {
      access_token: access_token,
      refresh_token: refresh_token,
    };
  }

  async updateRefreshTokenHash(userId: number, refreshToken: string) {
    try {
      const salt = await bcrypt.genSalt(saltOrRounds);
      const hashedRefreshToken = await bcrypt.hash(refreshToken, salt);

      await this.prisma.authTokens.update({
        where: { companyUserId: userId },
        data: {
          hashedRefreshToken: hashedRefreshToken,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }

  async getProfile(id: number) {
    return await this.usersService.findOne(id);
  }

  async login(user: any) {
    try {
      if (user.hasOwnProperty('statusCode')) {
        return user;
      }
      const tokens = await this.getTokens(user.id, user.userName);
      const userInfo = await this.prisma.companyUser.findUnique({
        where: {
          id: user.id,
        },
      });
      return successHandler(
        {
          access_token: tokens.access_token,
          refresh_token: tokens.refresh_token,
          expires_in: jwtConstants.expires_in,
          token_type: 'Bearer',
          fullname: userInfo.fullName,
          role: userInfo.role,
        },
        'Authenticated!',
      );
    } catch (err) {
      return errorhandler(400, JSON.stringify(err.message));
    }

    // Prepare the payload as a common response
  }

  async refreshTokens(userId: number, refreshToken: string) {
    try {
      const user = await this.prisma.companyUser.findUnique({
        where: {
          id: userId,
        },
      });
      if (!user) throw new ForbiddenException('Access Denied');

      const userWithRefreshToken = await this.prisma.authTokens.findUnique({
        where: {
          companyUserId: user.id,
        },
      });
      if (!userWithRefreshToken) throw new ForbiddenException('Access Denied');

      const refreshTokenMatches = await bcrypt.compare(
        refreshToken,
        userWithRefreshToken.hashedRefreshToken,
      );
      if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');

      const tokens = await this.getTokens(user.id, user.userName);
      await this.updateRefreshTokenHash(user.id, tokens.refresh_token);
      return successHandler(tokens, 'Success');
    } catch (err) {
      return errorhandler(400, JSON.stringify(err.message));
    }
  }

  async logout(userId: number) {
    try {
      await this.prisma.authTokens.delete({
        where: {
          companyUserId: userId,
        },
      });
      return successHandler({}, 'Success');
    } catch (err) {
      return errorhandler(400, JSON.stringify(err.message));
    }
  }

  async changeUserPassword(
    changeUserPasswordDto: ChangeUserPasswordDto,
    user: { id: number; userName: string },
  ) {
    try {
      const userWithOldPassword = await this.prisma.companyUser.findUnique({
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

      await this.prisma.companyUser.update({
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
      const token = Math.floor(1000 + Math.random() * 900000).toString();
      const user = await this.prisma.companyUser.findFirst({
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
          where: { companyUserEmail: email },
        });

      if (userWithAVerificationCode) {
        await this.prisma.resetPasswordToken.delete({
          where: { companyUserEmail: email },
        });
      }
      await this.prisma.resetPasswordToken.create({
        data: {
          token: token,
          companyUserEmail: email,
        },
      });

      return await sendMailTest(email, token.toString());
    } catch (err) {
      return errorhandler(400, JSON.stringify(err.message));
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
      userResetPasswordTokenInfo.createdAt.getTime() + 5 * 60000 <
      now.getTime()
    ) {
      return errorhandler(500, 'Verifiaction code Expired');
    }

    if (userResetPasswordTokenInfo.token !== resetUserPasswordDto.token) {
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

    const userToUpdate = await this.prisma.companyUser.findUnique({
      where: { email: userResetPasswordTokenInfo.companyUserEmail },
    });

    if (!userToUpdate) {
      return errorhandler(404, 'User Not Found');
    }

    await this.prisma.resetPasswordToken.delete({
      where: { companyUserEmail: userToUpdate.email },
    });

    try {
      const salt = await bcrypt.genSalt(saltOrRounds);
      const encPassword = await bcrypt.hash(
        resetUserPasswordDto.newPassword,
        salt,
      );

      await this.prisma.companyUser.update({
        where: { email: userToUpdate.email },
        data: {
          password: encPassword,
          lastModifiedBy: userToUpdate.id,
          lastModifiedDate: new Date(),
        },
      });
      return successHandler({}, 'Password Changed successfully');
    } catch (error) {
      console.log(error);
      return errorhandler(504, 'Something went wrong. Please try again.');
    }
  }
}
