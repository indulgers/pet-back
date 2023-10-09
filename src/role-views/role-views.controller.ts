import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoleViewsService } from './role-views.service';
import { CreateRoleViewDto } from './dto/create-role-view.dto';
import { UpdateRoleViewDto } from './dto/update-role-view.dto';

@Controller('role-views')
export class RoleViewsController {
  constructor(private readonly roleViewsService: RoleViewsService) {}

  @Post()
  create(@Body() createRoleViewDto: CreateRoleViewDto) {
    return this.roleViewsService.create(createRoleViewDto);
  }

  @Get()
  findAll() {
    return this.roleViewsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleViewsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleViewDto: UpdateRoleViewDto) {
    return this.roleViewsService.update(+id, updateRoleViewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleViewsService.remove(+id);
  }
}
