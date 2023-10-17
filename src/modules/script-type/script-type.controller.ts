import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ScriptTypeService } from './script-type.service';
import { CrudController } from '../shared/crud.controller';
import { ScriptType } from './entities/script-type.entity';
import { CreateScriptTypeDto } from './dto/create-script-type.dto';

@Controller('script-type')
export class ScriptTypeController extends CrudController<ScriptType> {
  constructor(private readonly scriptTypeService: ScriptTypeService) {
    super(scriptTypeService);
  }

  @Post('/create')
  createScriptType(@Body() createScriptTypeDto: CreateScriptTypeDto) {
    return this.scriptTypeService.create(createScriptTypeDto);
  }
}
