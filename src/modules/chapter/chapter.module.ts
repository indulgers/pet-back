import { Module } from '@nestjs/common';
import { ChapterService } from './chapter.service';
import { ChapterController } from './chapter.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chapter } from './entities/chapter.entity';
import { Script } from '../script/entities/script.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Chapter, Script])],
  controllers: [ChapterController],
  providers: [ChapterService],
})
export class ChapterModule {}
