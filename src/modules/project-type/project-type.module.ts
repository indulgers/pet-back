import { Module } from '@nestjs/common';
import { ProjectTypeService } from './project-type.service';
import { ProjectTypeController } from './project-type.controller';

@Module({
  controllers: [ProjectTypeController],
  providers: [ProjectTypeService]
})
export class ProjectTypeModule {}
