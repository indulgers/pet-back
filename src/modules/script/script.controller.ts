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

@Controller('script')
export class ScriptController {
  constructor(private readonly scriptService: ScriptService) {}

  @Post('/create')
  create(@Body() createScriptDto: CreateScriptDto) {
    return this.scriptService.create(createScriptDto);
  }

  @Get('/findAll')
  findAll() {
    return this.scriptService.findAll();
  }

  @Get('/findByUser/:user_id')
  findByUser(@Param('user_id') user_id: string) {
    return this.scriptService.findByUserId(user_id);
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
