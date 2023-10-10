import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ScriptTypeService } from './script-type.service';
import { CreateScriptTypeDto } from './dto/create-script-type.dto';
import { UpdateScriptTypeDto } from './dto/update-script-type.dto';

@Controller('script-type')
export class ScriptTypeController {
  constructor(private readonly scriptTypeService: ScriptTypeService) {}

  @Post()
  create(@Body() createScriptTypeDto: CreateScriptTypeDto) {
    return this.scriptTypeService.create(createScriptTypeDto);
  }

  @Get()
  findAll() {
    return this.scriptTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scriptTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateScriptTypeDto: UpdateScriptTypeDto) {
    return this.scriptTypeService.update(+id, updateScriptTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scriptTypeService.remove(+id);
  }
}
