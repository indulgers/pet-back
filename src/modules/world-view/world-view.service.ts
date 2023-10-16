import { Injectable } from '@nestjs/common';
import { CreateWorldViewDto } from './dto/create-world-view.dto';
import { UpdateWorldViewDto } from './dto/update-world-view.dto';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { WorldView } from './entities/world-view.entity';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { CreateProjectDto } from '../project/dto/create-project.dto';
import { guid } from '../../common/utils/utils';
import { Project } from '../project/entities/project.entity';
import { EntityManager, Repository } from 'typeorm';
import { Script } from '../script/entities/script.entity';

@Injectable()
export class WorldViewService extends TypeOrmCrudService<WorldView> {
  constructor(@InjectRepository(WorldView) repo) {
    super(repo);
  }

  @InjectEntityManager()
  private readonly worldViewManager: EntityManager;

  @InjectRepository(Script)
  private readonly scriptManager: Repository<Script>;
  async create(createWorldViewDto: CreateWorldViewDto) {
    const script = await this.scriptManager.findOne({
      where: { script_id: createWorldViewDto.script.script_id },
    });
    if (!script) {
      // 处理找不到 Script 的情况，可以抛出错误或者返回 null
      throw new Error('Script not found');
    }

    const newWorldView = this.repo.create(createWorldViewDto);
    newWorldView.id = guid();
    // 将找到的 Script 对象与新的 Project 对象关联
    newWorldView.script = script;

    return await this.repo.save(newWorldView);
  }
}
