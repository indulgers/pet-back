import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RoleRolaService } from './role-rola.service';
import { CreateRoleRolaDto } from './dto/create-role-rola.dto';
import { UpdateRoleRolaDto } from './dto/update-role-rola.dto';

@Controller('role-rola')
export class RoleRolaController {
  constructor(private readonly roleRolaService: RoleRolaService) {}

  @Post()
  create(@Body() createRoleRolaDto: CreateRoleRolaDto) {
    return this.roleRolaService.create(createRoleRolaDto);
  }

  @Get()
  findAll() {
    return this.roleRolaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleRolaService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRoleRolaDto: UpdateRoleRolaDto,
  ) {
    return this.roleRolaService.update(+id, updateRoleRolaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleRolaService.remove(+id);
  }
}
