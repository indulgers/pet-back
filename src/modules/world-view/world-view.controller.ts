import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Put,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { WorldViewService } from './world-view.service';
import { CreateWorldViewDto } from './dto/create-world-view.dto';
import { WorldView } from './entities/world-view.entity';
import { ApiTags } from '@nestjs/swagger';
import {
  CrudController,
  CustomCrudController,
} from '../shared/crud.controller';
@ApiTags('WorldView')
@Controller('world-view')
export class WorldViewController extends CrudController<WorldView> {
  constructor(private readonly worldViewService: WorldViewService) {
    super(worldViewService);
  }
  @Post('/create')
  createWorldView(@Body() createWorldViewDto: CreateWorldViewDto) {
    return this.worldViewService.create(createWorldViewDto);
  }
  // 添加额外的自定义逻辑
}
