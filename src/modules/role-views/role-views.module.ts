import { Module } from '@nestjs/common';
import { RoleViewsService } from './role-views.service';
import { RoleViewsController } from './role-views.controller';

@Module({
  controllers: [RoleViewsController],
  providers: [RoleViewsService]
})
export class RoleViewsModule {}
