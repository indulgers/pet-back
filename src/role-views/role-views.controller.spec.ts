import { Test, TestingModule } from '@nestjs/testing';
import { RoleViewsController } from './role-views.controller';
import { RoleViewsService } from './role-views.service';

describe('RoleViewsController', () => {
  let controller: RoleViewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoleViewsController],
      providers: [RoleViewsService],
    }).compile();

    controller = module.get<RoleViewsController>(RoleViewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
