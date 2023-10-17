import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ScriptService } from './script.service';
import { CreateScriptDto } from './dto/create-script.dto';
import { dynamicQueryDto } from '../project/dto/dynamicQuery.dto';
import { CrudController } from '../shared/crud.controller';
import { Script } from './entities/script.entity';
import { ApiTags } from '@nestjs/swagger';
import { MultiFieldQueryDto } from './dto/multifield.dto';
@ApiTags('Script')
@Controller('script')
export class ScriptController extends CrudController<Script> {
  constructor(private readonly scriptService: ScriptService) {
    super(scriptService);
  }

  @Post('/create')
  createScript(@Body() createScriptDto: CreateScriptDto) {
    return this.scriptService.create(createScriptDto);
  }

  @Get('/find')
  find(@Body() queryDto: dynamicQueryDto) {
    return this.scriptService.dynamicSearch(queryDto);
  }

  @Get('/findElastic/')
  findElastic(@Body() queryDto: dynamicQueryDto) {
    return this.scriptService.dynamicElasticSearch(queryDto);
  }

  @Get('/findMultiField')
  findMultiField(@Body() queryDto: MultiFieldQueryDto) {
    return this.scriptService.findWithMultipleFields(queryDto);
  }
}
