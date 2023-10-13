import { Injectable } from '@nestjs/common';
import { CreateScriptTypeDto } from './dto/create-script-type.dto';
import { UpdateScriptTypeDto } from './dto/update-script-type.dto';

@Injectable()
export class ScriptTypeService {
  create(createScriptTypeDto: CreateScriptTypeDto) {
    return 'This action adds a new scriptType';
  }

  findAll() {
    return `This action returns all scriptType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} scriptType`;
  }

  update(id: number, updateScriptTypeDto: UpdateScriptTypeDto) {
    return `This action updates a #${id} scriptType`;
  }

  remove(id: number) {
    return `This action removes a #${id} scriptType`;
  }
}
