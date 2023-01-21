import { Controller } from '@nestjs/common';
import { SysadminsService } from './sysadmins.service';

@Controller('sysadmins')
export class SysadminsController {
  constructor(private readonly sysadminsService: SysadminsService) {}
}
