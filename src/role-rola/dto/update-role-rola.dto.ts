import { PartialType } from '@nestjs/swagger';
import { CreateRoleRolaDto } from './create-role-rola.dto';

export class UpdateRoleRolaDto extends PartialType(CreateRoleRolaDto) {}
