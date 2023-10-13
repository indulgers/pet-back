import { PartialType } from '@nestjs/mapped-types';
import { UserDto } from './get-user.dto';

export class UpdateUserDto extends PartialType(UserDto) {}
