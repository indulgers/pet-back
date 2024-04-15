import { Injectable } from '@nestjs/common';
import { CreateArtifactDto } from './dto/create-artifact.dto';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Artifact } from './entities/artifact.entity';
import { CrudService } from '../shared/crud.service';
import { guid } from '../../common/utils/utils';
import { Repository } from 'typeorm';
import { Script } from '../script/entities/script.entity';
import { Project } from '../project/entities/project.entity';
import { Chapter } from '../chapter/entities/chapter.entity';

@Injectable()
export class ArtifactService extends CrudService<Artifact> {
  constructor(@InjectRepository(Artifact) repo) {
    super(repo);
  }

  @InjectRepository(Artifact)
  private readonly artifactRepository: Repository<Artifact>;

  @InjectRepository(Chapter)
  private readonly chapterRepository: Repository<Chapter>;

  @InjectRepository(Project)
  private readonly projectRepository: Repository<Project>;

  async create(createArtifactDto: CreateArtifactDto) {
    const project = await this.projectRepository.findOne({
      where: { project_id: createArtifactDto.project_id },
    });
    if (!project) {
      // 处理找不到 Script 的情况，可以抛出错误或者返回 null
      throw new Error('Project not found');
    }
    const chapter = await this.chapterRepository.findOne({
      where: { id: createArtifactDto.chapter_id },
    });
    if (!chapter) {
      // 处理找不到 Script 的情况，可以抛出错误或者返回 null
      throw new Error('Chapter not found');
    }
    const newArtifact = this.artifactRepository.create(createArtifactDto);
    newArtifact.id = guid();
    newArtifact.flow_id = guid();
    // 赋值 chapter_id, user_id, project_id, script_id
    newArtifact.chapter = chapter;
    newArtifact.user = project.user;
    newArtifact.project = project;
    newArtifact.script = chapter.script;
    return super.create(newArtifact);
  }
}
