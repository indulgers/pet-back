import { Module } from '@nestjs/common';
import { RoleRolaService } from './role-rola.service';
import { RoleRolaController } from './role-rola.controller';

@Module({
  controllers: [RoleRolaController],
  providers: [RoleRolaService],
})
export class RoleRolaModule {}
