import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateScriptDto } from './dto/create-script.dto';
import { UpdateScriptDto } from './dto/update-script.dto';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Script } from './entities/script.entity';
import { guid } from '../../common/utils/utils';
import { dynamicQueryDto } from '../project/dto/dynamicQuery.dto';
import { Project } from '../project/entities/project.entity';
import { Chapter } from '../chapter/entities/chapter.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class ScriptService {
  @InjectRepository(Script)
  private readonly scriptRepository: Repository<Script>;

  @InjectEntityManager()
  private readonly ScriptManager: EntityManager;

  @InjectRepository(User)
  private readonly userManager: Repository<User>;

  async create(createScriptDto: CreateScriptDto) {
    const user = await this.userManager.findOne({
      where: { user_id: createScriptDto.user.user_id },
    });

    if (!user) {
      // 处理找不到 Script 的情况，可以抛出错误或者返回 null
      throw new Error('User not found');
    }
    const newScript = this.scriptRepository.create(createScriptDto);
    newScript.script_id = guid(); // 如果需要为新项目生成唯一标识，可以在这里设置
    newScript.id = guid();
    if (newScript.projects) {
      newScript.projects.forEach((project) => {
        project.id = guid();
      });
    }
    return await this.scriptRepository.save(newScript);
  }
  async dynamicSearch(queryDto: dynamicQueryDto): Promise<Script[]> {
    const queryBuilder = this.scriptRepository.createQueryBuilder('script');

    if (queryDto.field && queryDto.value) {
      queryBuilder.where(`script.${queryDto.field} = :value`, {
        value: queryDto.value,
      });
    }

    return await queryBuilder.getMany();
  }

  async dynamicElasticSearch(queryDto: dynamicQueryDto): Promise<Script[]> {
    const queryBuilder = this.scriptRepository.createQueryBuilder('script');

    if (queryDto.field && queryDto.value) {
      queryBuilder.where(`script.${queryDto.field}  like :value`, {
        value: `%${queryDto.value}%`,
      });
    }

    return await queryBuilder.getMany();
  }
  async update(script_id: string, updateScriptDto: UpdateScriptDto) {
    const Script = await this.scriptRepository.findOne({
      where: {
        script_id: script_id,
      },
    });
    if (!Script) {
      // 处理找不到项目的情况，可以抛出异常或返回相应的错误信息
      throw new NotFoundException(`Script with id ${script_id} not found`);
    }

    // 更新项目的属性
    Object.assign(Script, updateScriptDto);

    // 保存更新后的项目
    return await this.scriptRepository.save(Script);
  }

  async remove(id: string) {
    const Script = await this.scriptRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!Script) {
      // 处理找不到项目的情况，可以抛出异常或返回相应的错误信息
      throw new NotFoundException(`Script with id ${id} not found`);
    }

    // 删除项目
    await this.scriptRepository.remove(Script);

    // 返回删除成功的消息或其他信息
    return `Script with id ${id} removed successfully`;
  }
}
