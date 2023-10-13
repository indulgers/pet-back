import { Injectable } from '@nestjs/common';
import { CreateWorldViewDto } from './dto/create-world-view.dto';
import { UpdateWorldViewDto } from './dto/update-world-view.dto';

@Injectable()
export class WorldViewService {
  create(createWorldViewDto: CreateWorldViewDto) {
    return 'This action adds a new worldView';
  }

  findAll() {
    return `This action returns all worldView`;
  }

  findOne(id: number) {
    return `This action returns a #${id} worldView`;
  }

  update(id: number, updateWorldViewDto: UpdateWorldViewDto) {
    return `This action updates a #${id} worldView`;
  }

  remove(id: number) {
    return `This action removes a #${id} worldView`;
  }
}
