import { Test, TestingModule } from '@nestjs/testing';
import { RoleRolaController } from './role-rola.controller';
import { RoleRolaService } from './role-rola.service';

describe('RoleRolaController', () => {
  let controller: RoleRolaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoleRolaController],
      providers: [RoleRolaService],
    }).compile();

    controller = module.get<RoleRolaController>(RoleRolaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
