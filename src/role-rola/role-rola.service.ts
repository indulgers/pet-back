import { Injectable } from '@nestjs/common';
import { CreateRoleRolaDto } from './dto/create-role-rola.dto';
import { UpdateRoleRolaDto } from './dto/update-role-rola.dto';

@Injectable()
export class RoleRolaService {
  create(createRoleRolaDto: CreateRoleRolaDto) {
    return 'This action adds a new roleRola';
  }

  findAll() {
    return `This action returns all roleRola`;
  }

  findOne(id: number) {
    return `This action returns a #${id} roleRola`;
  }

  update(id: number, updateRoleRolaDto: UpdateRoleRolaDto) {
    return `This action updates a #${id} roleRola`;
  }

  remove(id: number) {
    return `This action removes a #${id} roleRola`;
  }
}
