import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WorldViewService } from './world-view.service';
import { CreateWorldViewDto } from './dto/create-world-view.dto';
import { UpdateWorldViewDto } from './dto/update-world-view.dto';

@Controller('world-view')
export class WorldViewController {
  constructor(private readonly worldViewService: WorldViewService) {}

  @Post()
  create(@Body() createWorldViewDto: CreateWorldViewDto) {
    return this.worldViewService.create(createWorldViewDto);
  }

  @Get()
  findAll() {
    return this.worldViewService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.worldViewService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorldViewDto: UpdateWorldViewDto) {
    return this.worldViewService.update(+id, updateWorldViewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.worldViewService.remove(+id);
  }
}
