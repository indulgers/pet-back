import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Script } from '../script/entities/script.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Script])],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
