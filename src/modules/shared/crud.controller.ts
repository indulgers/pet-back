import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CrudService } from './crud.service';

@Controller()
export class CrudController<T> {
  constructor(private readonly service: CrudService<T>) {}

  @Get()
  findAll(): Promise<T[]> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<T> {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() entity: T): Promise<T> {
    return this.service
      .create(entity)
      .then((createdEntities: T[]) => createdEntities[0]);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() entity: T): Promise<T> {
    return this.service.update(id, entity);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<string> {
    return this.service.remove(id);
  }
}
export class CustomCrudController<T> extends CrudController<T> {
  constructor(service: any) {
    super(service);
  }

  // 在这里可以添加您的自定义逻辑
}
