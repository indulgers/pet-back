import { Injectable } from '@nestjs/common';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Chapter } from './entities/chapter.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChapterService {
  @InjectRepository(Chapter)
  private readonly chapterRepository: Repository<Chapter>;

  async create(createChapterDto: CreateChapterDto) {
    return await this.chapterRepository.save(createChapterDto);
  }

  findAll() {
    return `This action returns all chapter`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chapter`;
  }

  update(id: number, updateChapterDto: UpdateChapterDto) {
    return `This action updates a #${id} chapter`;
  }

  remove(id: number) {
    return `This action removes a #${id} chapter`;
  }
}
