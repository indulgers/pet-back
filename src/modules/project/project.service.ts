import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { ResultData } from '../../common/utils/result';
import { plainToInstance } from 'class-transformer';
import { guid } from '../../common/utils/utils';
import { dynamicQueryDto } from './dto/dynamicQuery.dto';
import { Script } from '../script/entities/script.entity';
import { CrudService } from "../shared/crud.service";
@Injectable()
export class ProjectService extends CrudService<Project>{
  constructor(@InjectRepository(Project) repo) {
    super(repo);
  }
  @InjectRepository(Project)
  private readonly projectRepository: Repository<Project>;

  @InjectEntityManager()
  private readonly projectManager: EntityManager;

  @InjectRepository(Script)
  private readonly scriptManager: Repository<Script>;

  private logger = new Logger();
  async create(createProjectDto: CreateProjectDto) {
    const script = await this.scriptManager.findOne({
      where: { script_id: createProjectDto.script.script_id },
    });
    if (!script) {
      // 处理找不到 Script 的情况，可以抛出错误或者返回 null
      throw new Error('Script not found');
    }

    const newProject = this.projectRepository.create(createProjectDto);
    newProject.project_id = guid(); // 为新项目生成唯一标识
    newProject.id = guid();
    // 将找到的 Script 对象与新的 Project 对象关联
    newProject.script = script;
    // 保存新的 Project 对象
    return super.create(newProject);
  }

  async findAllProjectsWithScripts(): Promise<Project[]> {
    return this.projectRepository.find({ relations: ['script'] });
  }
  async update(project_id: string, updateProjectDto: UpdateProjectDto) {
    const project = await this.projectRepository.findOne({
      where: {
        project_id: project_id,
      },
    });
    if (!project) {
      // 处理找不到项目的情况，可以抛出异常或返回相应的错误信息
      throw new NotFoundException(`Project with id ${project_id} not found`);
    }
    // 更新项目的属性
    Object.assign(project, updateProjectDto);
    // 保存更新后的项目
    return await this.projectRepository.save(project);
  }

  async dynamicSearch(queryDto: dynamicQueryDto): Promise<Project[]> {
    const queryBuilder = this.projectRepository.createQueryBuilder('project');

    if (queryDto.field && queryDto.value) {
      if (queryDto.field === 'script_id') {
        // 如果字段是 script_id，创建 JOIN 来筛选关联的项目
        queryBuilder.innerJoin(
          'project.script',
          'script',
          'script.id = :value',
          {
            value: queryDto.value,
          },
        );
      } else {
        queryBuilder.where(`project.${queryDto.field} = :value`, {
          value: queryDto.value,
        });
      }
    }

    return await queryBuilder.getMany();
  }

}
