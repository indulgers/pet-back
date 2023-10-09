import { Injectable } from '@nestjs/common';
import { CreateScriptDto } from './dto/create-script.dto';
import { UpdateScriptDto } from './dto/update-script.dto';

@Injectable()
export class ScriptService {
  create(createScriptDto: CreateScriptDto) {
    return 'This action adds a new script';
  }

  findAll() {
    return `This action returns all script`;
  }

  findOne(id: number) {
    return `This action returns a #${id} script`;
  }

  update(id: number, updateScriptDto: UpdateScriptDto) {
    return `This action updates a #${id} script`;
  }

  remove(id: number) {
    return `This action removes a #${id} script`;
  }
}
