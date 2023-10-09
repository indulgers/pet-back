import { Injectable } from '@nestjs/common';
import { CreateRoleViewDto } from './dto/create-role-view.dto';
import { UpdateRoleViewDto } from './dto/update-role-view.dto';

@Injectable()
export class RoleViewsService {
  create(createRoleViewDto: CreateRoleViewDto) {
    return 'This action adds a new roleView';
  }

  findAll() {
    return `This action returns all roleViews`;
  }

  findOne(id: number) {
    return `This action returns a #${id} roleView`;
  }

  update(id: number, updateRoleViewDto: UpdateRoleViewDto) {
    return `This action updates a #${id} roleView`;
  }

  remove(id: number) {
    return `This action removes a #${id} roleView`;
  }
}
