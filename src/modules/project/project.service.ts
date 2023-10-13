import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { ResultData } from '../../common/utils/result';
import { plainToInstance } from 'class-transformer';
import { guid } from '../../common/utils/utils';
import { dynamicQueryDto } from './dto/dynamicQuery.dto';
@Injectable()
export class ProjectService {
  @InjectRepository(Project)
  private readonly projectRepository: Repository<Project>;

  @InjectEntityManager()
  private readonly projectManager: EntityManager;

  async create(createProjectDto: CreateProjectDto) {
    const newProject = this.projectRepository.create(createProjectDto);
    newProject.project_id = guid(); // 如果需要为新项目生成唯一标识，可以在这里设置
    newProject.id = guid();
    return await this.projectRepository.save(newProject);
  }
  findAll() {
    return this.projectRepository.find();
  }

  async findByUserId(user_id: string) {
    return await this.projectRepository.find({
      where: {
        user_id: user_id,
      },
    });
  }
  async findByScriptId(script_id: string) {
    return await this.projectRepository.find({
      where: {
        script_id: script_id,
      },
    });
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

  async dynamicQuery(queryDto: dynamicQueryDto): Promise<Project[]> {
    const queryBuilder = this.projectRepository.createQueryBuilder('project');

    if (queryDto.field && queryDto.value) {
      queryBuilder.where(`project.${queryDto.field} = :value`, {
        value: queryDto.value,
      });
    }
    return await queryBuilder.getMany();
  }
  async remove(project_id: string) {
    const project = await this.projectRepository.findOne({
      where: {
        project_id: project_id,
      },
    });
    if (!project) {
      // 处理找不到项目的情况，可以抛出异常或返回相应的错误信息
      throw new NotFoundException(`Project with id ${project_id} not found`);
    }

    // 删除项目
    await this.projectRepository.remove(project);

    // 返回删除成功的消息或其他信息
    return `Project with id ${project_id} removed successfully`;
  }
}
