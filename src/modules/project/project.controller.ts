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

@Controller('project')
export class ProjectController {
  constructor(private readonly ProjectService: ProjectService) {}

  @Post('/create')
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.ProjectService.create(createProjectDto);
  }

  @Get('/findDynamic')
  findDynamic(@Body() queryDto: dynamicQueryDto) {
    return this.ProjectService.dynamicQuery(queryDto);
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
