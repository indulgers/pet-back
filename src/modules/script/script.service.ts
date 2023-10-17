import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateScriptDto } from './dto/create-script.dto';
import { UpdateScriptDto } from './dto/update-script.dto';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Script } from './entities/script.entity';
import { guid } from '../../common/utils/utils';
import { dynamicQueryDto } from '../project/dto/dynamicQuery.dto';
import { User } from '../user/entities/user.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { MultiFieldQueryDto } from './dto/multifield.dto';
import { CrudService } from '../shared/crud.service';

@Injectable()
export class ScriptService extends CrudService<Script> {
  constructor(@InjectRepository(Script) repo) {
    super(repo);
  }
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
    newScript.user = user;
    if (newScript.projects) {
      newScript.projects.forEach((project) => {
        project.id = guid();
      });
    }
    return super.create(newScript);
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

  async findWithMultipleFields(
    queryDto: MultiFieldQueryDto,
  ): Promise<Script[]> {
    const { script_name, nickname } = queryDto;

    const queryBuilder = this.scriptRepository
      .createQueryBuilder('script')
      .leftJoinAndSelect('script.user', 'user');

    if (script_name) {
      queryBuilder.andWhere('script.script_name = :script_name', {
        script_name,
      });
    }

    if (nickname) {
      queryBuilder.andWhere('user.nickname = :nickname', { nickname });
    }

    return queryBuilder.getMany();
  }
}
