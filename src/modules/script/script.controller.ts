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
import { UpdateScriptDto } from './dto/update-script.dto';
import { dynamicQueryDto } from '../project/dto/dynamicQuery.dto';

@Controller('script')
export class ScriptController {
  constructor(private readonly scriptService: ScriptService) {}

  @Post('/create')
  create(@Body() createScriptDto: CreateScriptDto) {
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
  @Patch('/update/:script_id')
  update(
    @Param('script_id') script_id: string,
    @Body() updateScriptDto: UpdateScriptDto,
  ) {
    return this.scriptService.update(script_id, updateScriptDto);
  }

  @Delete('/delete/:script_id')
  remove(@Param('script_id') script_id: string) {
    return this.scriptService.remove(script_id);
  }
}
