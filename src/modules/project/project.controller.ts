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
  @Patch('/update/:id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.ProjectService.update(id, updateProjectDto);
  }
  @Get('/getProjectByScript')
  async findAllProjectsWithScripts() {
    return this.ProjectService.findAllProjectsWithScripts();
  }
  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.ProjectService.remove(id);
  }
}
