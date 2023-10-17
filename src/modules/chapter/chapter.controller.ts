import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ChapterService } from './chapter.service';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { dynamicQueryDto } from '../project/dto/dynamicQuery.dto';
import { LoginGuard } from '../../login.guard';
import { ApiTags } from '@nestjs/swagger';
import { CrudController } from '../shared/crud.controller';
import { Chapter } from './entities/chapter.entity';
@ApiTags('Chapter')
@Controller('chapter')
export class ChapterController extends CrudController<Chapter> {
  constructor(private readonly chapterService: ChapterService) {
    super(chapterService);
  }

  @Post('/create')
  createChapter(@Body() createChapterDto: CreateChapterDto) {
    return this.chapterService.create(createChapterDto);
  }

  @Get('/find')
  find(@Body() queryDto: dynamicQueryDto) {
    return this.chapterService.dynamicSearch(queryDto);
  }
}
