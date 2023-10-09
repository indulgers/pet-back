import { Test, TestingModule } from '@nestjs/testing';
import { RoleViewsService } from './role-views.service';

describe('RoleViewsService', () => {
  let service: RoleViewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoleViewsService],
    }).compile();

    service = module.get<RoleViewsService>(RoleViewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
