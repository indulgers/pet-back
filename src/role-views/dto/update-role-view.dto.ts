import { PartialType } from '@nestjs/swagger';
import { CreateRoleViewDto } from './create-role-view.dto';

export class UpdateRoleViewDto extends PartialType(CreateRoleViewDto) {}
