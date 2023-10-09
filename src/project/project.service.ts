import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { ResultData } from '../common/utils/result';
import { plainToInstance } from 'class-transformer';
import { guid } from '../common/utils/utils';
@Injectable()
export class ProjectService {
  @InjectRepository(Project)
  private readonly projectRepository: Repository<Project>;

  @InjectEntityManager()
  private readonly projectManager: EntityManager;

  async create(createProjectDto: CreateProjectDto) {
    const NewProject = new Project();
    NewProject.project_id = guid();
    NewProject.user_id = createProjectDto.user_id;
    NewProject.script_id = guid();
    NewProject.style = createProjectDto.style;
    NewProject.roles_info = createProjectDto.roles_info;
    NewProject.cover_url = createProjectDto.cover_url;
    NewProject.status = createProjectDto.status;
    NewProject.access_control = createProjectDto.access_control;

    return await this.projectRepository.save(NewProject);
  }
  findAll() {
    return this.projectRepository.find();
  }

  async findOne(id: string) {
    return await this.projectRepository.findOne({
      where: {
        id: id, // 或者简写为 id，根据你的模型定义
      },
    });
  }
  async findByUserId(user_id: string) {
    return await this.projectRepository.findOne({
      where: {
        user_id: user_id, // 或者简写为 id，根据你的模型定义
      },
    });
  }
  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} Project`;
  }

  remove(id: number) {
    return `This action removes a #${id} Project`;
  }
}
