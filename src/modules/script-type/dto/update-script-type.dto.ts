import { PartialType } from '@nestjs/swagger';
import { CreateScriptTypeDto } from './create-script-type.dto';

export class UpdateScriptTypeDto extends PartialType(CreateScriptTypeDto) {}
