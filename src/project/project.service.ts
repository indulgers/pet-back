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
    const newProject = this.projectRepository.create(createProjectDto);
    newProject.project_id = guid(); // 如果需要为新项目生成唯一标识，可以在这里设置

    return await this.projectRepository.save(newProject);
  }
  findAll() {
    return this.projectRepository.find();
  }

  async findOne(id: string) {
    return await this.projectRepository.findOne({
      where: {
        id: id,
      },
    });
  }
  async findByUserId(user_id: string) {
    return await this.projectRepository.findOne({
      where: {
        user_id: user_id,
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
