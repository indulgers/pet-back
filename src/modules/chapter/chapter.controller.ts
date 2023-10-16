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

@Controller('chapter')
@UseGuards(LoginGuard)
export class ChapterController {
  constructor(private readonly chapterService: ChapterService) {}

  @Post('/create')
  create(@Body() createChapterDto: CreateChapterDto) {
    return this.chapterService.create(createChapterDto);
  }

  @Get('/find')
  find(@Body() queryDto: dynamicQueryDto) {
    return this.chapterService.dynamicSearch(queryDto);
  }

  @Patch('/update/:id')
  update(@Param('id') id: string, @Body() updateChapterDto: UpdateChapterDto) {
    return this.chapterService.update(+id, updateChapterDto);
  }

  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.chapterService.remove(+id);
  }
}
