import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { LoginGuard } from '../../login.guard';
import { dynamicQueryDto } from './dto/dynamicQuery.dto';
import { CrudController } from '../shared/crud.controller';
import { Project } from './entities/project.entity';

@Controller('project')
export class ProjectController extends CrudController<Project> {
  constructor(private readonly ProjectService: ProjectService) {
    super(ProjectService);
  }

  @Post('/create')
  createProject(@Body() createProjectDto: CreateProjectDto) {
    return this.ProjectService.create(createProjectDto);
  }

  @Get('/find')
  findDynamic(@Body() queryDto: dynamicQueryDto) {
    return this.ProjectService.dynamicSearch(queryDto);
  }

  @Get('/getProjectByScript')
  async findAllProjectsWithScripts() {
    return this.ProjectService.findAllProjectsWithScripts();
  }
}
