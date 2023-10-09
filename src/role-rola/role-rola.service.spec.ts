import { Test, TestingModule } from '@nestjs/testing';
import { RoleRolaService } from './role-rola.service';

describe('RoleRolaService', () => {
  let service: RoleRolaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoleRolaService],
    }).compile();

    service = module.get<RoleRolaService>(RoleRolaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
