import { Injectable } from '@nestjs/common';
import { CreateWorldViewDto } from './dto/create-world-view.dto';
import { WorldView } from './entities/world-view.entity';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { guid } from '../../common/utils/utils';
import { EntityManager, Repository } from 'typeorm';
import { Script } from '../script/entities/script.entity';
import { CrudService } from '../shared/crud.service';

@Injectable()
export class WorldViewService extends CrudService<WorldView> {
  constructor(@InjectRepository(WorldView) repo: Repository<WorldView>) {
    super(repo);
  }
  @InjectEntityManager()
  private readonly worldViewManager: EntityManager;

  @InjectRepository(Script)
  private readonly scriptRepository: Repository<Script>;

  @InjectRepository(WorldView)
  private readonly worldViewRepository: Repository<WorldView>;
  async create(createWorldViewDto: CreateWorldViewDto) {
    const script = await this.scriptRepository.findOne({
      where: { script_id: createWorldViewDto.script.script_id },
    });
    if (!script) {
      // 处理找不到 Script 的情况，可以抛出错误或者返回 null
      throw new Error('Script not found');
    }

    const newWorldView = this.worldViewRepository.create(createWorldViewDto);
    newWorldView.id = guid();
    // 将找到的 Script 对象与新的 Project 对象关联
    newWorldView.script = script;
    return super.create(newWorldView);
  }
}
