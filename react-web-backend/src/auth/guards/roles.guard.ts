import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CompanyUsersService } from 'src/companyUsers/companyUsers.service';

@Injectable()
export class UserRolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(forwardRef(() => CompanyUsersService))
    private readonly companyUsersService: CompanyUsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.getAllAndMerge<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!roles) {
      return true;
    }
    let result = false;
    const { user } = context.switchToHttp().getRequest();
    const userrole = (
      await this.companyUsersService.findbyUserName(user.username)
    ).role;
    const resultArray = roles.find((v) => v == userrole);
    resultArray?.length && (result = true);
    return result;
  }
}
