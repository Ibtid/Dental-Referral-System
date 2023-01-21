import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from '../../user/user.service';

@Injectable()
export class UserRolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(forwardRef(() => UserService))
    private readonly usersService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    let result = false;
    const { user } = context.switchToHttp().getRequest();
    const userrole = await this.usersService.findbyEmail(user.email);
    result = userrole.role.some((v) => roles.includes(v));
    return result;
  }
}
