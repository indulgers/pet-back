import { PartialType } from '@nestjs/swagger';
import { CreateWorldViewDto } from './create-world-view.dto';

export class UpdateWorldViewDto extends PartialType(CreateWorldViewDto) {}
