import { Injectable } from '@nestjs/common';
import { CreateScriptTypeDto } from './dto/create-script-type.dto';
import { UpdateScriptTypeDto } from './dto/update-script-type.dto';
import { ScriptType } from './entities/script-type.entity';
import { CrudService } from '../shared/crud.service';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class ScriptTypeService extends CrudService<ScriptType> {
  constructor(@InjectRepository(ScriptType) repo) {
    super(repo);
  }

  create(createScriptTypeDto: CreateScriptTypeDto) {
    const { type_name } = createScriptTypeDto;

    const scriptType = new ScriptType();
    scriptType.type_id = 1;
    scriptType.type_name = type_name;
    scriptType.status = 1;
    return super.create(scriptType);
  }
}
