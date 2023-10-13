import { Inject, Injectable } from '@nestjs/common';

import { User } from '../modules/user/entities/user.entity';
import { UserService } from '../modules/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

  async validateUser(payload: { id: string }): Promise<User> {
    return await this.userService.findUserById(payload.id);
  }
}
