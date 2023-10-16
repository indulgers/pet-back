import { Injectable, UseGuards } from "@nestjs/common";
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Chapter } from './entities/chapter.entity';
import { Repository } from 'typeorm';
import { guid } from '../../common/utils/utils';
import { Script } from '../script/entities/script.entity';
import { dynamicQueryDto } from '../project/dto/dynamicQuery.dto';
import { LoginGuard } from '../../login.guard';

@Injectable()
export class ChapterService {
  @InjectRepository(Chapter)
  private readonly chapterRepository: Repository<Chapter>;

  @InjectRepository(Script)
  private readonly scriptManager: Repository<Script>;

  async create(createChapterDto: CreateChapterDto) {
    const script = await this.scriptManager.findOne({
      where: { script_id: createChapterDto.script.script_id },
    });
    if (!script) {
      // 处理找不到 Script 的情况，可以抛出错误或者返回 null
      throw new Error('Script not found');
    }
    const newChapter = this.chapterRepository.create(createChapterDto);
    newChapter.id = guid();
    newChapter.script = script;
    return await this.chapterRepository.save(newChapter);
  }

  async dynamicSearch(queryDto: dynamicQueryDto): Promise<Chapter[]> {
    const queryBuilder = this.chapterRepository.createQueryBuilder('chapter');

    if (queryDto.field && queryDto.value) {
      if (queryDto.field === 'script_id') {
        // 如果字段是 script_id，创建 JOIN 来筛选关联的项目
        queryBuilder.innerJoin(
          'chapter.script',
          'script',
          'script.id = :value',
          {
            value: queryDto.value,
          },
        );
      } else {
        queryBuilder.where(`chapter.${queryDto.field} = :value`, {
          value: queryDto.value,
        });
      }
    }

    return await queryBuilder.getMany();
  }

  update(id: number, updateChapterDto: UpdateChapterDto) {
    return this.chapterRepository.update(id, updateChapterDto);
  }

  remove(id: number) {
    return this.chapterRepository.delete(id);
  }
}
