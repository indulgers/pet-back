import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateScriptDto } from './dto/create-script.dto';
import { UpdateScriptDto } from './dto/update-script.dto';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Script } from './entities/script.entity';
import { guid } from '../../common/utils/utils';

@Injectable()
export class ScriptService {
  @InjectRepository(Script)
  private readonly ScriptRepository: Repository<Script>;

  @InjectEntityManager()
  private readonly ScriptManager: EntityManager;

  async create(createScriptDto: CreateScriptDto) {
    const newScript = this.ScriptRepository.create(createScriptDto);
    newScript.script_id = guid(); // 如果需要为新项目生成唯一标识，可以在这里设置
    newScript.id = guid();
    return await this.ScriptRepository.save(newScript);
  }
  findAll() {
    return this.ScriptRepository.find();
  }

  async findByUserId(user_id: string) {
    return await this.ScriptRepository.find({
      where: {
        user_id: user_id,
      },
    });
  }
  async update(script_id: string, updateScriptDto: UpdateScriptDto) {
    const Script = await this.ScriptRepository.findOne({
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
    return await this.ScriptRepository.save(Script);
  }

  async remove(script_id: string) {
    const Script = await this.ScriptRepository.findOne({
      where: {
        script_id: script_id,
      },
    });
    if (!Script) {
      // 处理找不到项目的情况，可以抛出异常或返回相应的错误信息
      throw new NotFoundException(`Script with id ${script_id} not found`);
    }

    // 删除项目
    await this.ScriptRepository.remove(Script);

    // 返回删除成功的消息或其他信息
    return `Script with id ${script_id} removed successfully`;
  }
}
