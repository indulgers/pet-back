import { Injectable } from '@nestjs/common';
import { CreateProjectTypeDto } from './dto/create-project-type.dto';
import { UpdateProjectTypeDto } from './dto/update-project-type.dto';

@Injectable()
export class ProjectTypeService {
  create(createProjectTypeDto: CreateProjectTypeDto) {
    return 'This action adds a new projectType';
  }

  findAll() {
    return `This action returns all projectType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} projectType`;
  }

  update(id: number, updateProjectTypeDto: UpdateProjectTypeDto) {
    return `This action updates a #${id} projectType`;
  }

  remove(id: number) {
    return `This action removes a #${id} projectType`;
  }
}
