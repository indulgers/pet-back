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
} from '@nestjs/common';
import { WorldViewService } from './world-view.service';
import { CreateWorldViewDto } from './dto/create-world-view.dto';
import { WorldView } from './entities/world-view.entity';
import {
  Crud,
  CrudController,
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import { ApiTags } from '@nestjs/swagger';
import { UpdateWorldViewDto } from './dto/update-world-view.dto';
@Crud({
  model: {
    type: WorldView,
  },
  params: {
    id: {
      field: 'id',
      type: 'string',
      primary: true,
    },
  },
})
@ApiTags('WorldView')
@Controller('world-view')
export class WorldViewController implements CrudController<WorldView> {
  constructor(public readonly service: WorldViewService) {}

  private logger = new Logger();
  @Post('/create')
  create(@Body() createWorldViewDto: CreateWorldViewDto) {
    return this.service.create(createWorldViewDto);
  }

  @Put('/update/:id')
  update(
    @ParsedRequest() req: CrudRequest,
    @Body() dto: UpdateWorldViewDto, // 这里的 dto 是前端发送的更新数据
  ) {
    this.logger.log('updateOneBase');
    this.logger.log(dto);
    return this.service.updateOne(req, dto);
  }
}
