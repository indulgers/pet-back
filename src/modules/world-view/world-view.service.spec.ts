import { Test, TestingModule } from '@nestjs/testing';
import { WorldViewService } from './world-view.service';

describe('WorldViewService', () => {
  let service: WorldViewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorldViewService],
    }).compile();

    service = module.get<WorldViewService>(WorldViewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
