import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OperationService } from './operation.service';
import { CreateOperationDto } from './dto/create-operation.dto';
import { UpdateOperationDto } from './dto/update-operation.dto';
import { ApiTags, ApiBody, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { Operation } from './entities/operation.entity';
import { ListResult } from '@/interface';
@Controller('operation')
@ApiTags('Operation')
export class OperationController {
  constructor(private readonly operationService: OperationService) {}

  @Post()
  @ApiBody({ type: CreateOperationDto })
  @ApiResponse({ status: 200, type: CreateOperationDto })
  create(@Body() createOperationDto: CreateOperationDto) {
    return this.operationService.create(createOperationDto);
  }

  @Get()
  @ApiQuery({ name: 'type', required: false })
  @ApiResponse({ status: 200, type: ListResult<Operation> } )
  findAll() {
    return this.operationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.operationService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOperationDto: UpdateOperationDto,
  ) {
    return this.operationService.update(+id, updateOperationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.operationService.remove(+id);
  }
}
